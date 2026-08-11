'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';
import { ArrowLeft, ImagePlus, Save, X } from 'lucide-react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  Button,
  Input,
  Textarea,
  Checkbox,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  toast,
} from '@/components/ui';
import { cn } from '@/lib/utils';
import { saveProperty } from '@/lib/landlord-properties';
import type { Property } from '@/lib/landlord-data';

const amenityOptions = ['Wi-Fi', '24/7 Power', 'Water', 'Security', 'Kitchen', 'Parking'];
const roomTypeOptions = ['Self-contained', 'Single room', 'Shared room', 'Studio'];

export function PropertyForm({ property }: { property?: Property }) {
  const router = useRouter();
  const isEdit = Boolean(property);
  const [amenities, setAmenities] = useState<string[]>(property?.amenities ?? []);
  const [saving, setSaving] = useState(false);
  const [imageUrl, setImageUrl] = useState(property?.imageUrl ?? '');
  const fileInputRef = useRef<HTMLInputElement>(null);

  function toggleAmenity(a: string) {
    setAmenities((prev) => (prev.includes(a) ? prev.filter((x) => x !== a) : [...prev, a]));
  }

  function handleImageChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      toast.error('Choose an image file');
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      toast.error('Choose an image smaller than 2 MB');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => setImageUrl(String(reader.result));
    reader.readAsDataURL(file);
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const roomsTotal = Number(formData.get('roomsTotal'));

    if (!imageUrl) {
      toast.error('Add a cover image before submitting');
      return;
    }
    if (!Number.isInteger(roomsTotal) || roomsTotal < 1) {
      toast.error('Enter at least one room');
      return;
    }

    setSaving(true);
    const existing = property ?? {};
    saveProperty({
      ...existing,
      id: property?.id ?? crypto.randomUUID(),
      name: String(formData.get('name')).trim(),
      description: String(formData.get('description')).trim(),
      address: String(formData.get('address')).trim(),
      price: Number(formData.get('price')),
      term: formData.get('term') as Property['term'],
      roomType: String(formData.get('roomType')),
      roomsTotal,
      status: property?.status ?? 'Inactive',
      availability: property?.availability ?? 'review',
      amenities,
      houseRules: String(formData.get('rules')).trim(),
      imageUrl,
    });
    toast.success(isEdit ? 'Listing updated' : 'Listing saved and sent for approval');
    router.push('/landlord/properties');
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div className="flex flex-col gap-4">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          asChild
          className="text-content-muted -ml-2 w-fit"
        >
          <Link href="/landlord/properties">
            <ArrowLeft className="size-4" />
            Back to properties
          </Link>
        </Button>
        <div className="flex flex-col gap-1">
          <h1 className="text-section font-display">
            {isEdit ? 'Edit property' : 'Add new property'}
          </h1>
          <p className="text-content-muted text-sm">
            {isEdit
              ? 'Update your listing details.'
              : 'Your listing will be reviewed before going live.'}
          </p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="flex flex-col gap-6 lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Basic details</CardTitle>
              <CardDescription>The essentials students will see first.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
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
              <div className="flex flex-col gap-1.5">
                <label htmlFor="description" className="text-sm font-medium">
                  Description
                </label>
                <Textarea
                  id="description"
                  name="description"
                  rows={4}
                  defaultValue={property?.description}
                  placeholder="Describe the space and what's nearby."
                />
              </div>
              <div className="flex flex-col gap-1.5">
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
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Photo</CardTitle>
              <CardDescription>A cover image for the listing.</CardDescription>
            </CardHeader>
            <CardContent>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="sr-only"
                onChange={handleImageChange}
              />
              {imageUrl ? (
                <div className="relative aspect-video overflow-hidden rounded-lg">
                  <Image
                    src={imageUrl}
                    alt="Listing preview"
                    fill
                    unoptimized
                    className="object-cover"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    className="bg-panel absolute top-3 right-3"
                    aria-label="Remove photo"
                    onClick={() => {
                      setImageUrl('');
                      if (fileInputRef.current) fileInputRef.current.value = '';
                    }}
                  >
                    <X className="size-4" />
                  </Button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="border-line/30 text-content-muted hover:border-lime-deep hover:text-content flex aspect-video w-full flex-col items-center justify-center gap-1.5 rounded-lg border border-dashed"
                >
                  <ImagePlus className="size-5" />
                  <span className="text-xs">Upload photo</span>
                </button>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Amenities & rules</CardTitle>
              <CardDescription>Select everything this property offers.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-6">
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {amenityOptions.map((a) => {
                  const checked = amenities.includes(a);
                  return (
                    <label
                      key={a}
                      className={cn(
                        'border-line/15 flex cursor-pointer items-center gap-2.5 rounded-lg border p-3 text-sm transition-colors',
                        checked ? 'border-lime-deep bg-lime/10' : 'hover:bg-ink/5',
                      )}
                    >
                      <Checkbox checked={checked} onCheckedChange={() => toggleAmenity(a)} />
                      {a}
                    </label>
                  );
                })}
              </div>
              <div className="flex flex-col gap-1.5">
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

        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Pricing & type</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
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
              <div className="flex flex-col gap-1.5">
                <span className="text-sm font-medium">Billing term</span>
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
              <div className="flex flex-col gap-1.5">
                <span className="text-sm font-medium">Room type</span>
                <Select name="roomType" defaultValue={property?.roomType} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select room type" />
                  </SelectTrigger>
                  <SelectContent>
                    {roomTypeOptions.map((r) => (
                      <SelectItem key={r} value={r}>
                        {r}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col gap-1.5">
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
            </CardContent>
          </Card>

          <div className="flex flex-col gap-2">
            <Button type="submit" disabled={saving}>
              <Save className="size-4" />
              {saving ? 'Saving…' : isEdit ? 'Save changes' : 'Save & submit for approval'}
            </Button>
            <Button type="button" variant="outline" asChild>
              <Link href="/landlord/properties">Cancel</Link>
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
}
