export interface Community {
    id: number;
    name: string;
    members: string;
    type: string;
    tag: string;
    logo: string;
    cover: string;
}

export const communityData: Community[] = [
    { id: 1, name: "Rust Protocol", members: "12.4k", type: "Popular", tag: "Systems", logo: "https://www.rust-lang.org/static/images/rust-logo-blk.svg", cover: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=400" },
    { id: 2, name: "Frontend Ops", members: "8.2k", type: "For You", tag: "Full-Stack", logo: "https://vercel.com/api/www/avatar/vercel?s=48", cover: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=400" },
    { id: 3, name: "AI Alignment", members: "24k", type: "Explore", tag: "Senior", logo: "https://openai.com/favicon.ico", cover: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=400" },
    { id: 4, name: "Fintech Nodes", members: "5.1k", type: "Popular", tag: "Engineering", logo: "https://stripe.com/favicon.ico", cover: "https://images.unsplash.com/photo-1551288049-bbbda5366392?q=80&w=400" },
    { id: 5, name: "Web3 Ledger", members: "3.2k", type: "Popular", tag: "Crypto", logo: "https://ethereum.org/favicon.ico", cover: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=400" },
];