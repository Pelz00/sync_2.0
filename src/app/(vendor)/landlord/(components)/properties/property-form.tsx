'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, FileText, ImagePlus, Save, Tag, UploadCloud, X } from 'lucide-react';
import {
  Button,
  Card,
  CardContent,
  Checkbox,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Textarea,
  toast,
} from '@/components/ui';
import { saveProperty } from '@/lib/landlord-properties';
import type { Property } from '@/lib/landlord-data';
import { cn } from '@/lib/utils';

const amenityOptions = ['Wi-Fi', '24/7 Power', 'Water', 'Security', 'Kitchen', 'Parking'];
const roomTypeOptions = ['Self-contained', 'Single room', 'Shared room', 'Studio'];

function SectionTitle({
  icon: Icon,
  title,
  description,
}: {
  icon: typeof FileText;
  title: string;
  description: string;
}) {
  return (
    <div className="flex items-center gap-4">
      <span className="bg-lime/10 text-lime-deep grid size-11 shrink-0 place-items-center rounded-full">
        <Icon className="size-5" />
      </span>
      <div>
        <h2 className="font-display text-lg font-semibold">{title}</h2>
        <p className="text-content-muted mt-0.5 text-sm">{description}</p>
      </div>
    </div>
  );
}

export function PropertyForm({ property }: { property?: Property }) {
  const router = useRouter();
  const isEdit = Boolean(property);
  const [amenities, setAmenities] = useState<string[]>(property?.amenities ?? []);
  const [description, setDescription] = useState(property?.description ?? '');
  const [saving, setSaving] = useState(false);
  const [imageUrls, setImageUrls] = useState<string[]>(
    property?.imageUrls?.length
      ? property.imageUrls
      : property?.imageUrl
        ? [property.imageUrl]
        : [],
  );
  const fileInputRef = useRef<HTMLInputElement>(null);

  function toggleAmenity(amenity: string) {
    setAmenities((current) =>
      current.includes(amenity)
        ? current.filter((item) => item !== amenity)
        : [...current, amenity],
    );
  }

  function selectImages(files: FileList | File[]) {
    const nextFiles = Array.from(files);
    if (!nextFiles.length) return;
    const acceptedFiles = nextFiles.filter((file) => {
      if (!file.type.startsWith('image/')) {
        toast.error(`${file.name} is not a supported image`);
        return false;
      }
      if (file.size > 10 * 1024 * 1024) {
        toast.error(`${file.name} is larger than 10 MB`);
        return false;
      }
      return true;
    });

    acceptedFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => setImageUrls((current) => [...current, String(reader.result)]);
      reader.readAsDataURL(file);
    });
  }

  function removeImage(index: number) {
    setImageUrls((current) => current.filter((_, currentIndex) => currentIndex !== index));
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const roomsTotal = Number(formData.get('roomsTotal'));

    if (!imageUrls.length) {
      toast.error('Add a property photo before submitting');
      return;
    }
    if (!Number.isInteger(roomsTotal) || roomsTotal < 1) {
      toast.error('Enter at least one room');
      return;
    }

    setSaving(true);
    saveProperty({
      ...(property ?? {}),
      id: property?.id ?? crypto.randomUUID(),
      name: String(formData.get('name')).trim(),
      description: description.trim(),
      address: String(formData.get('address')).trim(),
      price: Number(formData.get('price')),
      term: formData.get('term') as Property['term'],
      roomType: String(formData.get('roomType')),
      roomsTotal,
      status: property?.status ?? 'Inactive',
      availability: property?.availability ?? 'review',
      amenities,
      houseRules: String(formData.get('rules')).trim(),
      imageUrl: imageUrls[0],
      imageUrls,
    });
    toast.success(isEdit ? 'Listing updated' : 'Listing saved and sent for approval');
    router.push('/landlord/properties');
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-7 pb-8">
      <div className="flex flex-col gap-4">
        <div>
          <h1 className="text-section text-content font-display">
            {isEdit ? 'Edit Property' : 'Add New Property'}
          </h1>
          <p className="text-content-muted mt-2 text-sm">
            {isEdit
              ? 'Update your listing details and keep your property information up to date.'
              : 'Add your listing details so students can find the right place to stay.'}
          </p>
        </div>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          asChild
          className="text-content-muted -ml-3 w-fit"
        >
          <Link href="/landlord/properties">
            <ArrowLeft className="size-4" />
            Back to properties
          </Link>
        </Button>
      </div>

      <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1.7fr)_minmax(320px,1fr)]">
        <div className="flex flex-col gap-6">
          <Card className="border-line/10 rounded-3xl border shadow-sm">
            <CardContent className="flex flex-col gap-6 p-6">
              <SectionTitle
                icon={FileText}
                title="Basic details"
                description="The essentials students will see first."
              />
              <div className="flex flex-col gap-5">
                <div className="flex flex-col gap-2">
                  <label htmlFor="name" className="text-sm font-medium">
                    Listing name
                  </label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="e.g. Tanke Crescent"
                    defaultValue={property?.name}
                    required
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="description" className="text-sm font-medium">
                    Description
                  </label>
                  <div className="relative">
                    <Textarea
                      id="description"
                      name="description"
                      rows={5}
                      maxLength={500}
                      value={description}
                      onChange={(event) => setDescription(event.target.value)}
                      placeholder="Describe the space and what's nearby."
                      className="resize-none pb-8"
                    />
                    <span className="text-content-muted pointer-events-none absolute right-3 bottom-3 text-xs">
                      {description.length} / 500
                    </span>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="address" className="text-sm font-medium">
                    Address
                  </label>
                  <Input
                    id="address"
                    name="address"
                    placeholder="Street, area, city"
                    defaultValue={property?.address}
                    required
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-line/10 rounded-3xl border shadow-sm">
            <CardContent className="flex flex-col gap-6 p-6">
              <SectionTitle
                icon={ImagePlus}
                title="Photos"
                description="Add photos to showcase your property."
              />
              <input
                ref={fileInputRef}
                type="file"
                accept="image/png,image/jpeg"
                multiple
                className="sr-only"
                onChange={(event) => {
                  if (event.target.files) selectImages(event.target.files);
                  event.target.value = '';
                }}
              />
              <div className="grid gap-5 md:grid-cols-2">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  onDragOver={(event) => event.preventDefault()}
                  onDrop={(event) => {
                    event.preventDefault();
                    selectImages(event.dataTransfer.files);
                  }}
                  className="border-line/20 text-content-muted hover:border-lime-deep hover:bg-lime/5 flex min-h-40 flex-col items-center justify-center gap-2 rounded-2xl border border-dashed p-5 text-center transition-colors"
                >
                  <UploadCloud className="size-8" />
                  <span className="text-sm font-medium">Click to upload or drag and drop</span>
                  <span className="text-xs">Add one or more JPG or PNG files, up to 10MB each</span>
                </button>
                <div className="min-w-0">
                  <p className="mb-2 text-sm font-medium">Listing photos ({imageUrls.length})</p>
                  {imageUrls.length ? (
                    <div className="grid grid-cols-2 gap-2">
                      {imageUrls.map((imageUrl, index) => (
                        <div
                          key={`${imageUrl}-${index}`}
                          className="relative aspect-[4/3] overflow-hidden rounded-xl first:col-span-2 first:aspect-video"
                        >
                          <Image
                            src={imageUrl}
                            alt={`Listing preview ${index + 1}`}
                            fill
                            unoptimized
                            className="object-cover"
                          />
                          <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            className="bg-panel absolute top-2 right-2"
                            aria-label={`Remove photo ${index + 1}`}
                            onClick={() => removeImage(index)}
                          >
                            <X className="size-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="bg-surface-deep text-content-muted flex min-h-40 items-center justify-center rounded-2xl text-sm">
                      Your photo previews will appear here.
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-line/10 rounded-3xl border shadow-sm">
            <CardContent className="flex flex-col gap-6 p-6">
              <SectionTitle
                icon={Tag}
                title="Amenities & rules"
                description="Select everything this property offers."
              />
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {amenityOptions.map((amenity) => {
                  const checked = amenities.includes(amenity);
                  return (
                    <label
                      key={amenity}
                      className={cn(
                        'border-line/15 flex cursor-pointer items-center gap-2.5 rounded-xl border p-3 text-sm transition-colors',
                        checked ? 'border-lime-deep bg-lime/10' : 'hover:bg-surface-deep',
                      )}
                    >
                      <Checkbox checked={checked} onCheckedChange={() => toggleAmenity(amenity)} />
                      {amenity}
                    </label>
                  );
                })}
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="rules" className="text-sm font-medium">
                  House rules
                </label>
                <Textarea
                  id="rules"
                  name="rules"
                  rows={3}
                  defaultValue={property?.houseRules}
                  placeholder="e.g. No loud music after 10pm."
                />
              </div>
            </CardContent>
          </Card>
        </div>

        <aside className="flex flex-col gap-6 lg:sticky lg:top-5">
          <Card className="border-line/10 rounded-3xl border shadow-sm">
            <CardContent className="flex flex-col gap-6 p-6">
              <SectionTitle
                icon={Tag}
                title="Pricing & type"
                description="Set how your property is listed."
              />
              <div className="flex flex-col gap-5">
                <div className="flex flex-col gap-2">
                  <label htmlFor="price" className="text-sm font-medium">
                    Price (₦)
                  </label>
                  <Input
                    id="price"
                    name="price"
                    type="number"
                    min="1"
                    placeholder="150000"
                    defaultValue={property?.price}
                    required
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium">Billing term</label>
                  <Select name="term" defaultValue={property?.term ?? 'per session'}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select term" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="per session">Per session</SelectItem>
                      <SelectItem value="per year">Per year</SelectItem>
                      <SelectItem value="per semester">Per semester</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium">Room type</label>
                  <Select name="roomType" defaultValue={property?.roomType} required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select room type" />
                    </SelectTrigger>
                    <SelectContent>
                      {roomTypeOptions.map((roomType) => (
                        <SelectItem key={roomType} value={roomType}>
                          {roomType}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="roomsTotal" className="text-sm font-medium">
                    Total rooms
                  </label>
                  <Input
                    id="roomsTotal"
                    name="roomsTotal"
                    type="number"
                    min="1"
                    defaultValue={property?.roomsTotal}
                    required
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex flex-col gap-3">
            <Button type="submit" size="lg" disabled={saving} className="w-full">
              <Save className="size-4" />
              {saving ? 'Saving…' : isEdit ? 'Save changes' : 'Save property'}
            </Button>
            <Button type="button" variant="outline" size="lg" className="w-full" asChild>
              <Link href="/landlord/properties">Cancel</Link>
            </Button>
          </div>
        </aside>
      </div>
    </form>
  );
}
