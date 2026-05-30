const API_BASE = 'http://localhost:8000/api';

// ── Cities & States ─────────────────────────────────
export const cities = [
  { id: 1, name: 'Chennai', state: 'Tamil Nadu', is_top_city: true },
  { id: 2, name: 'Mumbai', state: 'Maharashtra', is_top_city: true },
  { id: 3, name: 'Delhi', state: 'Delhi', is_top_city: true },
  { id: 4, name: 'Bengaluru', state: 'Karnataka', is_top_city: true },
  { id: 5, name: 'Hyderabad', state: 'Telangana', is_top_city: true },
  { id: 6, name: 'Kolkata', state: 'West Bengal', is_top_city: true },
  { id: 7, name: 'Pune', state: 'Maharashtra', is_top_city: true },
  { id: 8, name: 'Ahmedabad', state: 'Gujarat', is_top_city: true },
  { id: 9, name: 'Kochi', state: 'Kerala', is_top_city: true },
  { id: 10, name: 'Coimbatore', state: 'Tamil Nadu', is_top_city: true },
  { id: 11, name: 'Madurai', state: 'Tamil Nadu', is_top_city: false },
  { id: 12, name: 'Trichy', state: 'Tamil Nadu', is_top_city: false },
  { id: 13, name: 'Salem', state: 'Tamil Nadu', is_top_city: false },
  { id: 14, name: 'Tirunelveli', state: 'Tamil Nadu', is_top_city: false },
  { id: 15, name: 'Vijayawada', state: 'Andhra Pradesh', is_top_city: false },
  { id: 16, name: 'Visakhapatnam', state: 'Andhra Pradesh', is_top_city: false },
  { id: 17, name: 'Thiruvananthapuram', state: 'Kerala', is_top_city: false },
  { id: 18, name: 'Jaipur', state: 'Rajasthan', is_top_city: false },
  { id: 19, name: 'Lucknow', state: 'Uttar Pradesh', is_top_city: false },
  { id: 20, name: 'Chandigarh', state: 'Punjab', is_top_city: false },
  { id: 21, name: 'Indore', state: 'Madhya Pradesh', is_top_city: false },
  { id: 22, name: 'Nagpur', state: 'Maharashtra', is_top_city: false },
  { id: 23, name: 'Bhopal', state: 'Madhya Pradesh', is_top_city: false },
  { id: 24, name: 'Patna', state: 'Bihar', is_top_city: false },
  { id: 25, name: 'Surat', state: 'Gujarat', is_top_city: false },
];

// ── Movies ──────────────────────────────────────────
export const movies = [
  {
    id: 1, title: 'Karuppu',
    poster: 'https://cdn.district.in/movies-assets/images/cinema/Karuppu-cover-64e37630-67b7-11f0-b49e-0daac2dae3b7.jpg',
    banner: 'https://cdn.district.in/movies-assets/images/cinema/Karuppu-cover-64e37630-67b7-11f0-b49e-0daac2dae3b7.jpg',
    runtime: '3h 04m', genres: 'Drama,Action', language: 'Tamil',
    format_type: '2D', release_date: '2026-05-16', rating: 'UA 13+',
    description: 'Karuppu is a Tamil action-fantasy film directed by RJ Balaji, starring Suriya as Saravanan, an honest lawyer who becomes a vessel for the mythical guardian deity Vettai Karuppu. The film blends courtroom drama with folklore to battle systemic corruption and caste-based atrocities against marginalized communities.',
    cast: 'Surya,Trisha,RJ Balaji,Swastika', director: 'RJ Balaji', is_featured: true,
  },
  {
    id: 2, title: 'Thunderbolts',
    poster: 'https://3dvf.com/wp-content/uploads/2025/04/thunderbolts.webp',
    banner: 'https://3dvf.com/wp-content/uploads/2025/04/thunderbolts.webp',
    runtime: '2h 35m', genres: 'Action,Sci-Fi,Adventure', language: 'English',
    format_type: 'IMAX 3D', release_date: '2026-05-02', rating: 'UA 13+',
    description: 'Thunderbolts is a Marvel Cinematic Universe (MCU) film about a dysfunctional group of disgraced castoffs, reformed anti-heroes, and assassins. After being ensnared in a deadly trap, these lone wolves must unite to survive a dangerous mission that forces them to confront the dark corners of their pasts.',
    cast: 'Florence Pugh,Sebastian Stan,David Harbour', director: 'Jake Schreier', is_featured: true,
  },
  {
    id: 3, title: 'Pushpa 2: The Rule',
    poster: 'https://cdn.gulte.com/wp-content/uploads/2024/12/IMG_9336.jpeg',
    banner: 'https://cdn.gulte.com/wp-content/uploads/2024/12/IMG_9336.jpeg',
    runtime: '2h 58m', genres: 'Action,Drama', language: 'Telugu',
    format_type: '2D', release_date: '2026-05-09', rating: 'UA',
    description: 'Pushpa 2: The Rule is a 2024 Telugu-language action-drama directed by Sukumar and starring Allu Arjun. It follows the iconic red sandalwood smuggler, Pushpa Raj, as he expands his syndicate to an international scale while facing a brutal, relentless vendetta from the humiliated police officer, SP Bhanwar Singh Shekhawat Pushpa returns in the epic conclusion of the smuggling saga.',
    cast: 'Allu Arjun,Rashmika Mandanna,Fahadh Faasil', director: 'Sukumar', is_featured: true,
  },
  {
    id: 4, title: 'War 2',
    poster: 'https://images.t2online.in/cdn-cgi/image/width=1200,quality=70/https://apis.t2online.in/image/journal/article.jpg?img_id=1459264&t=1752517906344',
    banner: 'https://images.t2online.in/cdn-cgi/image/width=1200,quality=70/https://apis.t2online.in/image/journal/article.jpg?img_id=1459264&t=1752517906344',
    runtime: '2h 45m', genres: 'Action,Thriller', language: 'Hindi',
    format_type: '3D', release_date: '2026-05-15', rating: 'UA',
    description: ' Agent Kabir (Hrithik Roshan) goes rogue to infiltrate a global terrorist organization, prompting R&AW to send their most lethal operative, Vikram (Jr NTR), to eliminate him. The two engage in a brutal cat-and-mouse hunt across the globe before uncovering divided loyalties and forming an alliance against the cartel.The explosive sequel to Indias biggest action franchise.',
    cast: 'Hrithik Roshan,Jr NTR,Kiara Advani', director: 'Ayan Mukerji', is_featured: true,
  },
  {
    id: 5, title: 'Empuraan',
    poster: 'https://cf-images.assettype.com/newindianexpress/2025-03-28/0f9rcov3/48531218912295915652000617709309834290461010n.jpg?w=1200&h=675&auto=format%2Ccompress&fit=max&enlarge=true',
    banner: 'https://cf-images.assettype.com/newindianexpress/2025-03-28/0f9rcov3/48531218912295915652000617709309834290461010n.jpg?w=1200&h=675&auto=format%2Ccompress&fit=max&enlarge=true',
    runtime: '2h 50m', genres: 'Action,Drama,Thriller', language: 'Malayalam',
    format_type: 'EPIQ', release_date: '2026-05-20', rating: 'UA',
    description: 'L2: Empuraan is a high-stakes action-thriller and the sequel to the 2019 blockbuster Lucifer. Directed by Prithviraj Sukumaran, the film follows the enigmatic crime lord Khureshi-Abraam (Mohanlal) as he balances international arms and diamond syndicates while battling global cartels and right-wing extremists to protect Kerala. The sequel to Lucifer. Zayed Masood faces new challenges.',
    cast: 'Mohanlal,Prithviraj,Manju Warrier', director: 'Prithviraj Sukumaran', is_featured: true,
  },
  {
    id: 6, title: 'Vidaamuyarchi',
    poster: 'https://cf-images.assettype.com/cinemaexpress%2F2025-02-06%2F6iw9265z%2FVidaamuyarchi.jpg',
    banner: 'https://cf-images.assettype.com/cinemaexpress%2F2025-02-06%2F6iw9265z%2FVidaamuyarchi.jpg',
    runtime: '2h 25m', genres: 'Action,Thriller', language: 'Tamil',
    format_type: '2D', release_date: '2026-05-01', rating: 'UA',
    description: 'A married couple trip takes an unsettling turn when the wife goes missing, prompting the husband s frantic search while an unknown villain creates obstacles. A man embarks on a dangerous journey to save his wife.',
    cast: 'Ajith Kumar,Trisha,Arjun Das', director: 'Magizh Thirumeni', is_featured: false,
  },
  {
    id: 7, title: 'Spirit',
    poster: 'https://i.ytimg.com/vi/kXX1uRQg0hc/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLAlWEHesFN87J7RLenf5xE0SCJOrw',
    banner: 'https://i.ytimg.com/vi/kXX1uRQg0hc/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLAlWEHesFN87J7RLenf5xE0SCJOrw',
    runtime: '2h 40m', genres: 'Drama,Crime', language: 'Hindi',
    format_type: '2D', release_date: '2026-05-08', rating: 'UA 13+',
    description: 'A spirit is a versatile term referring to the non-physical, animating essence of a person, a supernatural entity, an emotional state, or a distilled alcoholic beverage A cop battles inner demons while solving a complex case.',
    cast: 'Prabhas,Saif Ali Khan,Shraddha Kapoor', director: 'Sandeep Reddy Vanga', is_featured: false,
  },
  {
    id: 8, title: 'Coolie',
    poster: 'https://static.toiimg.com/thumb/msid-123303912,width-1280,height-720,resizemode-4/123303912.jpg',
    banner: 'https://static.toiimg.com/thumb/msid-123303912,width-1280,height-720,resizemode-4/123303912.jpg',
    runtime: '2h 55m', genres: 'Action,Comedy,Drama', language: 'Tamil',
    format_type: '2D', release_date: '2026-05-22', rating: 'UA',
    description: 'Rajinikanths mass entertainer about a coolie who rises to power. A "coolie" is an historical term for an unskilled, low-wage laborer, though it is widely regarded as an offensive racial slur in many parts of the world. The word originated in 17th-century India and was later used throughout Asia and colonial-era plantations.',
    cast: 'Rajinikanth,Shruti Haasan,Sathyaraj', director: 'Lokesh Kanagaraj', is_featured: true,
  },
  {
    id: 9, title: 'Toxic',
    poster: 'https://i.ytimg.com/vi/6bg5tM2jmUU/sddefault.jpg?v=6572b62f',
    banner: 'https://i.ytimg.com/vi/6bg5tM2jmUU/sddefault.jpg?v=6572b62f',
    runtime: '2h 30m', genres: 'Action,Crime,Thriller', language: 'Kannada',
    format_type: '2D', release_date: '2026-05-10', rating: 'UA 16+',
    description: ' The highly anticipated 2026 Indian period action film Toxic: A Fairy Tale for Grown-Ups stars Yash as a mobster named Raya. Set in Goa between the 1940s and 1970s, the story follows his character forging a criminal empire through blood and fear while navigating power struggles, betrayal, and international smuggling routes A dark underworld saga spanning continents.',
    cast: 'Yash,Kiara Advani,Nayanthara', director: 'Geetu Mohandas', is_featured: false,
  },
  {
    id: 10, title: 'Final Destination: Bloodlines',
    poster: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDVy6CDWZN-h8mfihoxuH6M8Zc6JD2VJlCnw&s',
    banner: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDVy6CDWZN-h8mfihoxuH6M8Zc6JD2VJlCnw&s',
    runtime: '1h 50m', genres: 'Horror,Thriller', language: 'English',
    format_type: '3D', release_date: '2026-05-16', rating: 'A',
    description: ' Final Destination: Bloodlines (the sixth installment in the horror franchise) follows college student Stefani Reyes, who inherits her grandmothers inherited visions of a 1969 skyscraper disaster. Realizing Death is actively hunting down the survivors and their descendants, her family must race to escape a complex sequence of fatal accidents. Death returns with a vengeance in this terrifying new chapter.',
    cast: 'Brec Bassinger,Teo Briones,Kaitlyn Santa Juana', director: 'Zach Lipovsky', is_featured: false,
  },
  {
    id: 11, title: 'Retro',
    poster: 'https://i.ytimg.com/vi/y1TsOIB96e8/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLDebGQSl1AzLV4VGAqw8iIrUFOBfA',
    banner: 'https://i.ytimg.com/vi/y1TsOIB96e8/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLDebGQSl1AzLV4VGAqw8iIrUFOBfA',
    runtime: '2h 35m', genres: 'Romance,Drama', language: 'Tamil',
    format_type: '2D', release_date: '2026-05-12', rating: 'UA',
    description: 'Retro (2025), directed by Karthik Subbaraj and starring Suriya and Pooja Hegde, is a Tamil-language romantic action drama. It follows Paarivel "Paari" Kannan (Suriya), a reformer gangster struggling to leave behind a violent past to live quietly with his love, Rukmini (Hegde) A heartfelt love story spanning different timelines.',
    cast: 'Suriya,Jyotika,Jayam Ravi', director: 'Gautham Vasudev Menon', is_featured: false,
  },
  {
    id: 12, title: 'Dacoit: A Love Story',
    poster: 'https://i.ytimg.com/vi/QWFfHuWEDjg/maxresdefault.jpg',
    banner: 'https://i.ytimg.com/vi/QWFfHuWEDjg/maxresdefault.jpg',
    runtime: '2h 35m', genres: 'Romance,Drama', language: 'Telugu',
    format_type: '2D', release_date: '2026-05-12', rating: 'UA',
    description:'A man is convicted for a crime he didnt commit owing to a betrayal by his better half. He hunts her down seeking vengeance, as their stories intertwine with a series of robberies.',
    cast: 'Adivi Sesh,Mrunal Takur,Sunil,Prakash raj', director: 'Shaneil deo', is_featured: false,
  },
  {
  id: 13,
  title: 'Marco',
  poster: 'https://images.slivcdn.com/videoasset_images/manage_file/1000000003/1739354930890624_MARCO_Landscape_Thumb.jpg?w=500&q=low',
  banner: 'https://images.slivcdn.com/videoasset_images/manage_file/1000000003/1739354930890624_MARCO_Landscape_Thumb.jpg?w=500&q=low',
  runtime: '2h 25m',
  genres: 'Action,Thriller',
  language: 'Malayalam',
  format_type: '2D',
  release_date: '2026-02-14',
  rating: 'A',
  decription: 'Marco is a Malayalam action thriller starring Unni Mukundan in the lead role. The story follows a ruthless man seeking revenge while navigating betrayal, gang conflicts, and intense action-packed situations.',
  cast: 'Unni Mukundan,Siddique,Jagadish',
  director: 'Haneef Adeni',
  is_featured: false,
},

{
  id: 14,
  title: 'Aavesham',
  poster: 'https://upperstall.com/wp-content/uploads/2024/05/Aavesham.jpg',
  banner: 'https://upperstall.com/wp-content/uploads/2024/05/Aavesham.jpg',
  runtime: '2h 38m',
  genres: 'Comedy,Action',
  language: 'Malayalam',
  format_type: '2D',
  release_date: '2026-03-20',
  rating: 'UA',
  decription: 'Aavesham is a Malayalam action comedy featuring Fahadh Faasil as a quirky gangster who unexpectedly becomes involved in the lives of college students in Bengaluru.',
  cast: 'Fahadh Faasil,Hipzster,Mithun Jai Shankar',
  director: 'Jithu Madhavan',
  is_featured: true,
},

{
  id: 15,
  title: 'Max',
  poster: 'https://jiotvimages.cdn.jio.com/imagespublic/34/41/a879b28163a75f249c26bf5f0153ff4c_1741278794999_l_medium.jpg',
  banner: 'https://jiotvimages.cdn.jio.com/imagespublic/34/41/a879b28163a75f249c26bf5f0153ff4c_1741278794999_l_medium.jpg',
  runtime: '2h 30m',
  genres: 'Action,Thriller',
  language: 'Kannada',
  format_type: '2D',
  release_date: '2026-04-11',
  rating: 'UA',
  decription: 'Max is a Kannada action thriller starring Kichcha Sudeep as a powerful police officer who faces dangerous enemies and political conspiracies.',
  cast: 'Sudeep,Varalaxmi Sarathkumar,Sunil',
  director: 'Vijay Karthikeyaa',
  is_featured: true,
},

{
  id: 16,
  title: 'Bagheera',
  poster: 'https://cdn.culturecrossroads.ca/images/e9d095a909326ffadfcfe3ba57434baf_cc.webp',
  banner: 'https://cdn.culturecrossroads.ca/images/e9d095a909326ffadfcfe3ba57434baf_cc.webp',
  runtime: '2h 40m',
  genres: 'Action,Crime',
  language: 'Kannada',
  format_type: '2D',
  release_date: '2026-01-18',
  rating: 'UA',
  decription: 'Bagheera follows the story of a masked vigilante fighting against corruption and injustice while protecting innocent people in the city.',
  cast: 'Sriimurali,Rukmini Vasanth,Prakash Raj',
  director: 'Dr. Suri',
  is_featured: false,
},

{
  id: 17,
  title: 'UI',
  poster: 'https://images.indianexpress.com/2024/01/ui-08012024.jpeg',
  banner: 'https://images.indianexpress.com/2024/01/ui-08012024.jpeg',
  runtime: '2h 32m',
  genres: 'Sci-Fi,Thriller',
  language: 'Kannada',
  format_type: '2D',
  release_date: '2026-05-02',
  rating: 'UA',
  decription: 'UI is a Kannada sci-fi thriller directed by Upendra, exploring futuristic technology, politics, and society through a unique cinematic style.',
  cast: 'Upendra,Reeshma Nanaiah,Murali Sharma',
  director: 'Upendra',
  is_featured: false,
},

{
  id: 18,
  title: 'Stree 2',
  poster: 'https://storage.firstindia.co.in/public/news/August2024/1723700232stree.png',
  banner: 'https://storage.firstindia.co.in/public/news/August2024/1723700232stree.png',
  runtime: '2h 20m',
  genres: 'Horror,Comedy',
  language: 'Hindi',
  format_type: '2D',
  release_date: '2026-02-28',
  rating: 'UA',
  decription: 'Stree 2 continues the spooky and hilarious adventures in Chanderi as the mysterious spirit returns, creating chaos among the villagers.',
  cast: 'Rajkummar Rao,Shraddha Kapoor,Pankaj Tripathi',
  director: 'Amar Kaushik',
  is_featured: true,
},

{
  id: 19,
  title: 'Singham Again',
  poster: 'https://i.ytimg.com/vi/zob9qX4ays4/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLAQE8k32JeAVQFkIzpcAkBnjB4KkQ',
  banner: 'https://i.ytimg.com/vi/zob9qX4ays4/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLAQE8k32JeAVQFkIzpcAkBnjB4KkQ',
  runtime: '2h 45m',
  genres: 'Action,Drama',
  language: 'Hindi',
  format_type: '2D',
  release_date: '2026-04-25',
  rating: 'UA',
  decription: 'Singham Again follows Bajirao Singham as he returns to fight powerful criminals and protect justice with high-octane action sequences.',
  cast: 'Ajay Devgn,Kareena Kapoor,Deepika Padukone',
  director: 'Rohit Shetty',
  is_featured: true,
},
  {
    id: 20, title: 'Devara Part 2',
    poster: 'https://akm-img-a-in.tosshub.com/indiatoday/images/story/202601/devara-2-shooting-283047105-16x9_0.jpg?VersionId=liNnxvp7YR7Shqd.m4WUHXKkqen.s6jl&size=690:388',
    banner: 'https://akm-img-a-in.tosshub.com/indiatoday/images/story/202601/devara-2-shooting-283047105-16x9_0.jpg?VersionId=liNnxvp7YR7Shqd.m4WUHXKkqen.s6jl&size=690:388',
    runtime: '2h 48m', genres: 'Action,Adventure', language: 'Telugu',
    format_type: 'IMAX 3D', release_date: '2026-05-18', rating: 'UA',
    description: 'Devara: Part 2 is an upcoming Telugu-language action epic directed by Koratala Siva, starring Jr. NTR in dual roles as the fearless Devara and his son Vara. The sequel will resolve the massive cliffhanger from the first film, exploring deep generational conflicts, vengeance, and the consequences of the original heros decisions. The epic saga of the sea lord continues.',
    cast: 'Jr NTR,Janhvi Kapoor,Saif Ali Khan', director: 'Koratala Siva', is_featured: false,
  },
];

// ── Languages ───────────────────────────────────────
export const languages = ['Tamil', 'English', 'Telugu', 'Hindi', 'Malayalam', 'Kannada'];

// ── Genres ───────────────────────────────────────────
export const genres = ['Action', 'Drama', 'Thriller', 'Comedy', 'Romance', 'Horror', 'Sci-Fi', 'Adventure', 'Crime'];

// ── Formats ─────────────────────────────────────────
export const formats = ['2D', '3D', 'EPIQ', 'IMAX 3D'];

// ── API Helper ──────────────────────────────────────
export async function apiFetch(endpoint) {
  try {
    const res = await fetch(`${API_BASE}${endpoint}`);
    if (!res.ok) throw new Error('API error');
    return await res.json();
  } catch {
    return null;
  }
}

export async function apiPost(endpoint, data) {
  try {
    const res = await fetch(`${API_BASE}${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('API error');
    return await res.json();
  } catch {
    return null;
  }
}

export { API_BASE };
