import { StaticImageData } from "next/image"

import OpenMicImage from "@/assets/images/OpenMic.jpg"
import techMeetUpImage from "@/assets/images/techmeet.jpg"
import soccer from "@/assets/images/soccer.jpg"
import BookClubImage from "@/assets/images/bookclub.jpg"
import sundayBrunchImage from "@/assets/images/sundaybrunch.jpg"
import comedyImage from "@/assets/images/comedy.jpg"
import hackathon from "@/assets/images/hackathon.jpg"
import partyImage from "@/assets/images/party.jpeg"
import taylorSwiftImage from "@/assets/images/taylor-swift.jpg"
import kendrickImage from "@/assets/images/kendrick.jpg"
import lilYatchyImage from "@/assets/images/lil-yatchy.jpg"
import BirthdayImage from '@/assets/images/birthday.jpg'
import ShineImage from '@/assets/images/shine.jpg'

export interface Ticket {
    id: string
    name: string
    desc: string
    price: number
}

export interface LineupArtist {
    name: string
    avatar?: StaticImageData
}

export interface Event {
    slug: string
    image: StaticImageData
    date: string
    price: string
    title: string
    location: string
    time: string
    category: string
    tickets: Ticket[]
    lineup?: LineupArtist[]
}

export const events: Event[] = [
    {
        slug: "open-mic-night",
        image: OpenMicImage,
        date: "TUE 28",
        price: "₦1,000",
        title: "Open mic night",
        location: "Caffeine Co.",
        time: "6pm",
        category: "Campus",
        lineup: [
            { name: "Tolu B", avatar: undefined },
            { name: "MC Fresh", avatar: undefined },
        ],
        tickets: [
            {
                id: "regular",
                name: "Regular Admission",
                desc: "Access to the event",
                price: 1000,
            },
            {
                id: "vip",
                name: "VIP",
                desc: "Front row seating + complimentary drink",
                price: 2500,
            },
        ],

    },
    {
        slug: "tech-meetup",
        image: techMeetUpImage,
        date: "WED 28",
        price: "Free",
        title: "Tech meetup: AI",
        location: "UNILORIN ICT",
        time: "4pm",
        category: "Campus",
        lineup: [
            { name: "Dr. Adewale", avatar: undefined },
        ],
        tickets: [
            {
                id: "regular",
                name: "Regular Admission",
                desc: "Access to the event",
                price: 1000,
            },
            {
                id: "vip",
                name: "VIP",
                desc: "Front row seating + complimentary drink",
                price: 2500,
            },
        ],

    },
    {
        slug: "book-club",
        image: BookClubImage,
        date: "THU 28",
        price: "₦500",
        title: "Book club: Achebe",
        location: "The Cube",
        time: "6pm",
        category: "Campus",
        lineup: [{
            name: "Rasheed a.k.a Vector"
        }],
        tickets: [
            {
                id: "regular",
                name: "Regular Admission",
                desc: "Access to the event",
                price: 1000,
            },
            {
                id: "vip",
                name: "VIP",
                desc: "Front row seating + complimentary drink",
                price: 2500,
            },
        ],

    },
    {
        slug: "afro-house-pool",
        image: partyImage,
        date: "FRI 28",
        price: "₦2,500",
        title: "Afro House Pool Party",
        location: "Crystal Park",
        time: "6pm",
        category: "Nightlife",
        lineup: [
            { name: "DJ Spinall", avatar: taylorSwiftImage },
            { name: "DJ Neptune", avatar: kendrickImage },
            { name: "Teni", avatar: lilYatchyImage },
        ],
        tickets: [
            {
                id: "regular",
                name: "Regular Admission",
                desc: "Access to the event",
                price: 1000,
            },
            {
                id: "vip",
                name: "VIP",
                desc: "Front row seating + complimentary drink",
                price: 2500,
            },
        ],

    },
    {
        slug: "kwasu-unilorin",
        image: soccer,
        date: "SAT 28",
        price: "Free",
        title: "KWASU vs UNILORIN",
        location: "Sports complex",
        time: "2pm",
        category: "Sports",
        // no lineup for a match
        tickets: [
            {
                id: "regular",
                name: "Regular Admission",
                desc: "Access to the event",
                price: 1000,
            },
            {
                id: "vip",
                name: "VIP",
                desc: "Front row seating + complimentary drink",
                price: 2500,
            },
        ],

    },
    {
        slug: "comedy",
        image: comedyImage,
        date: "SAT 28",
        price: "₦5,000",
        title: "Comedy: I Go Dye",
        location: "Convocation Hall",
        time: "8pm",
        category: "Concert",
        lineup: [
            { name: "I Go Dye", avatar: taylorSwiftImage },
            { name: "AY Comedian", avatar: kendrickImage },
            { name: "Bovi", avatar: lilYatchyImage },
            { name: "Basketmouth", avatar: undefined },
        ],
        tickets: [
            {
                id: "regular",
                name: "Regular Admission",
                desc: "Access to the event",
                price: 1000,
            },
            {
                id: "vip",
                name: "VIP",
                desc: "Front row seating + complimentary drink",
                price: 2500,
            },
        ],

    },
    {
        slug: "sunday-brunch-vibes",
        image: sundayBrunchImage,
        date: "SUN 28",
        price: "₦3,000",
        title: "Sunday brunch and vibes",
        location: "Flower garden",
        time: "1pm",
        category: "Nightlife",
        lineup: [
            { name: "DJ Lyta", avatar: taylorSwiftImage },
        ],
        tickets: [
            {
                id: "regular",
                name: "Regular Admission",
                desc: "Access to the event",
                price: 1000,
            },
            {
                id: "vip",
                name: "VIP",
                desc: "Front row seating + complimentary drink",
                price: 2500,
            },
        ],

    },
    {
        slug: "hackathon-kickoff",
        image: hackathon,
        date: "MON 28",
        price: "Free",
        title: "Hackathon kickoff",
        location: "Skyview Hall",
        time: "10am",
        category: "Campus",
        lineup: [
            { name: "Segun Tech", avatar: undefined },
            { name: "Ada Codes", avatar: undefined },
            { name: "BuildCo", avatar: undefined },
        ],
        tickets: [
            {
                id: "regular",
                name: "Regular Admission",
                desc: "Access to the event",
                price: 1000,
            },
            {
                id: "vip",
                name: "VIP",
                desc: "Front row seating + complimentary drink",
                price: 2500,
            },
        ],

    },
    {
        slug: "queen-birthday",
        image: BirthdayImage,
        date: "SAT 28",
        price: "₦6,000",
        title: "Queen Tima's Birthday Party",
        location: "The Lounge, GRA",
        time: "6pm",
        category: "Nightlife",
        lineup: [
            { name: "DJ Cuppy", avatar: taylorSwiftImage },
            { name: "Surprise guest", avatar: kendrickImage },
        ],
        tickets: [
            {
                id: "regular",
                name: "Regular Admission",
                desc: "Access to the event",
                price: 1000,
            },
            {
                id: "vip",
                name: "VIP",
                desc: "Front row seating + complimentary drink",
                price: 2500,
            },
        ],
    },
    {
        slug: "paintball-party",
        image: ShineImage,
        date: "MON 30",
        price: "₦4,000",
        title: "Paintball Party",
        location: "Adventure Park, Malete",
        time: "8pm",
        category: "Sports",
        // no lineup for a paintball session
        tickets: [
            {
                id: "regular",
                name: "Regular Admission",
                desc: "Access to the event",
                price: 1000,
            },
            {
                id: "vip",
                name: "VIP",
                desc: "Front row seating + complimentary drink",
                price: 2500,
            },
        ],
    },
]




