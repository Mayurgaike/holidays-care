const toursData = [
  {
    id: "kashmir",
    name: "Kashmir",
    price: "₹24,999",
    image: "/kashmir.jpg",
    duration: "6 Days / 5 Nights",
    description: "Known as 'Paradise on Earth', Kashmir is a breathtaking destination nestled in the Himalayas. With snow-capped peaks, pristine lakes, fragrant gardens, and warm hospitality, Kashmir is a dream destination for every traveler. From the serene Dal Lake to the adventure-filled slopes of Gulmarg, every corner of Kashmir tells a story of unmatched natural beauty.",
    highlights: [
      "Dal Lake Shikara Ride",
      "Gulmarg Gondola Ride",
      "Pahalgam Valley Walk",
      "Mughal Gardens Visit",
      "Sonmarg Glacier Trek",
      "Houseboat Stay",
      "Betaab Valley",
      "Aru Valley"
    ],
    itinerary: [
      "Day 1: Arrive Srinagar – Transfer to Houseboat – Evening Shikara Ride on Dal Lake",
      "Day 2: Srinagar Sightseeing – Mughal Gardens (Shalimar, Nishat, Chashme Shahi) – Local Market",
      "Day 3: Full Day Gulmarg – Gondola Phase 1 & 2 – Snow Activities",
      "Day 4: Pahalgam – Betaab Valley – Aru Valley – Chandanwari",
      "Day 5: Sonmarg Day Trip – Thajiwas Glacier – River Sindh",
      "Day 6: Srinagar Local – Lal Chowk – Shopping – Departure"
    ],
    includes: [
      "5 Nights Accommodation (Houseboat + Hotel)",
      "Daily Breakfast",
      "Airport / Railway Transfers",
      "Sightseeing by Private Cab",
      "Shikara Ride on Dal Lake",
      "All Toll & Parking Charges"
    ],
    excludes: [
      "Airfare / Train Fare",
      "Gondola Tickets (Approx ₹800–1400 per person)",
      "Lunch & Dinner",
      "Personal Expenses & Tips",
      "Adventure Activities",
      "Any item not mentioned in inclusions"
    ]
  },
  {
    id: "ladakh",
    name: "Leh Ladakh",
    price: "₹34,999",
    image: "/ladakh.jpg",
    duration: "7 Days / 6 Nights",
    description: "Leh Ladakh is a land like no other — rugged mountain passes, turquoise lakes, ancient Buddhist monasteries, and a sky full of stars. Situated at an altitude of over 3,500 meters, Ladakh is the ultimate destination for adventure seekers and peace lovers alike. Experience the raw, unspoiled beauty of the Himalayas and Karakoram ranges.",
    highlights: [
      "Pangong Tso Lake",
      "Nubra Valley & Sand Dunes",
      "Khardung La Pass (World's Highest Motorable Road)",
      "Magnetic Hill",
      "Hemis & Thiksey Monastery",
      "Double Hump Camel Ride in Nubra",
      "Leh Palace",
      "Zanskar River Confluence"
    ],
    itinerary: [
      "Day 1: Arrive Leh (3,500m) – Complete Rest for Acclimatization – Dinner at Hotel",
      "Day 2: Local Sightseeing – Shanti Stupa, Leh Palace, Hall of Fame, Magnetic Hill, Sangam",
      "Day 3: Leh to Nubra Valley via Khardung La Pass – Camel Ride at Sand Dunes – Overnight Nubra",
      "Day 4: Nubra to Pangong Lake via Shyok Route – Sunset at Pangong – Overnight Camp",
      "Day 5: Sunrise at Pangong Tso – Return to Leh via Chang La Pass",
      "Day 6: Hemis Monastery, Thiksey Monastery, Shey Palace",
      "Day 7: Departure from Leh Airport"
    ],
    includes: [
      "6 Nights Stay (Hotels + Camping at Pangong)",
      "Breakfast & Dinner Daily",
      "Airport Transfers",
      "Inner Line Permits",
      "All Sightseeing by Innova/Xylo",
      "Camel Ride in Nubra"
    ],
    excludes: [
      "Airfare",
      "Lunch",
      "Monument Entry Fees",
      "Adventure Activities (River Rafting, ATV)",
      "Personal Expenses",
      "Oxygen Cylinder (recommended to carry)"
    ]
  },
  {
    id: "sikkim",
    name: "Sikkim",
    price: "₹29,999",
    image: "/sikkim.jpg",
    duration: "6 Days / 5 Nights",
    description: "Sikkim, the smallest state of India, is a jewel in the Eastern Himalayas. With the majestic Kanchenjunga (world's third highest peak) as its backdrop, Sikkim offers lush green valleys, ancient Buddhist monasteries, sparkling rivers, and vibrant festivals. A perfect blend of nature, spirituality, and adventure.",
    highlights: [
      "Tsomgo (Changu) Lake",
      "Baba Mandir",
      "Nathula Pass (Indo-China Border)",
      "Pelling Kanchenjunga View",
      "Rumtek Monastery",
      "MG Marg Gangtok",
      "Skywalk at Pelling",
      "Teesta River"
    ],
    itinerary: [
      "Day 1: Arrive NJP/Bagdogra – Transfer to Gangtok (4-5 hrs) – MG Marg Evening Walk",
      "Day 2: Tsomgo Lake, Baba Mandir, Nathula Pass (permit required) – Return Gangtok",
      "Day 3: Gangtok Local – Rumtek Monastery, Enchey Monastery, Namgyal Institute",
      "Day 4: Gangtok to Pelling (3-4 hrs) – Rabdentse Ruins – Sangachoeling Monastery",
      "Day 5: Pelling – Skywalk, Rimbi Waterfall, Kanchenjunga View at Sunrise",
      "Day 6: Return to NJP/Bagdogra – Departure"
    ],
    includes: [
      "5 Nights Hotel Stay",
      "Daily Breakfast",
      "All Transfers by Car",
      "All Sightseeing",
      "Nathula Permit Assistance",
      "Toll & Parking"
    ],
    excludes: [
      "Airfare / Train Fare",
      "Nathula Permit Fee (₹200 per person)",
      "Lunch & Dinner",
      "Cable Car Charges",
      "Personal Expenses",
      "Any item not mentioned"
    ]
  },
  {
    id: "rajasthan",
    name: "Rajasthan",
    price: "₹19,999",
    image: "/rajasthan.jpg",
    duration: "7 Days / 6 Nights",
    description: "Rajasthan, the Land of Kings, is India's most colorful and culturally rich state. From the majestic Amber Fort to the golden sand dunes of Jaisalmer, from the blue city of Jodhpur to the romantic lakes of Udaipur — Rajasthan is a royal experience like no other. Every palace, fort, and haveli here tells a story of valor, romance, and grandeur.",
    highlights: [
      "Amber Fort, Jaipur",
      "Hawa Mahal & City Palace",
      "Mehrangarh Fort, Jodhpur",
      "Jaisalmer Desert Safari & Camel Ride",
      "Sam Sand Dunes",
      "City Palace & Lake Pichola, Udaipur",
      "Ranakpur Jain Temples",
      "Cultural Folk Dance Shows"
    ],
    itinerary: [
      "Day 1: Arrive Jaipur – Pink City Tour – Hawa Mahal, Jantar Mantar",
      "Day 2: Amber Fort, Nahargarh Fort, Jal Mahal, Birla Mandir – Local Market",
      "Day 3: Jaipur to Jodhpur (5 hrs) – Mehrangarh Fort, Jaswant Thada, Clock Tower Market",
      "Day 4: Jodhpur to Jaisalmer (3 hrs) – Jaisalmer Fort, Patwon Ki Haveli",
      "Day 5: Jaisalmer Desert Safari – Sam Sand Dunes – Camel Ride – Cultural Night",
      "Day 6: Jaisalmer to Udaipur (6 hrs) – Lake Pichola Evening",
      "Day 7: City Palace, Jagdish Temple, Sajjangarh – Departure"
    ],
    includes: [
      "6 Nights Hotel Stay (Including Desert Camp)",
      "Daily Breakfast",
      "AC Car for All Transfers & Sightseeing",
      "Camel Safari at Sand Dunes",
      "Cultural Folk Dance Show",
      "All Toll & Parking"
    ],
    excludes: [
      "Airfare / Train Fare",
      "Lunch & Dinner",
      "Monument Entry Tickets",
      "Elephant Ride at Amber Fort",
      "Personal Expenses",
      "Boating at Lake Pichola"
    ]
  },
  {
    id: "himachal",
    name: "Himachal Pradesh",
    price: "₹29,999",
    image: "/himachal.jpg",
    duration: "6 Days / 5 Nights",
    description: "Himachal Pradesh is nature's own canvas — snow-capped mountains, dense pine forests, apple orchards, and roaring rivers. From the colonial charm of Shimla to the adventure hub of Manali, Himachal offers something for every traveler. Whether you seek trekking, skiing, or simply peaceful mountain air, Himachal is the answer.",
    highlights: [
      "Rohtang Pass Snow Point",
      "Solang Valley Adventure Activities",
      "Shimla Mall Road & Ridge",
      "Hadimba Devi Temple Manali",
      "Old Manali & Vashisht Hot Springs",
      "Kullu Valley & River Beas",
      "Johala Waterfall",
      "Tibetan Monastery Manali"
    ],
    itinerary: [
      "Day 1: Arrive Shimla – Mall Road, Ridge, Christ Church, Jakhu Temple",
      "Day 2: Shimla Local – Kufri, Fagu, Wildflower Hall Drive",
      "Day 3: Shimla to Manali via Kullu (8 hrs) – Kullu Shawl Factory Stop",
      "Day 4: Solang Valley – Paragliding, Zorbing, Ropeway – Evening Old Manali",
      "Day 5: Rohtang Pass (conditions permitting) – Snow Activities – Hadimba Temple",
      "Day 6: Vashisht Hot Springs – Local Market – Departure"
    ],
    includes: [
      "5 Nights Hotel Stay",
      "Breakfast & Dinner Daily",
      "All Transfers by AC Car",
      "All Sightseeing",
      "Rohtang Pass Permit",
      "Toll & Parking Charges"
    ],
    excludes: [
      "Airfare / Train Fare",
      "Lunch",
      "Adventure Activities (Paragliding, Skiing etc.)",
      "Rohtang Pass Taxi (Mandatory Govt. Vehicle)",
      "Personal Expenses",
      "Any item not in inclusions"
    ]
  },
  {
    id: "uttarakhand",
    name: "Uttarakhand",
    price: "₹24,999",
    image: "/uttarakhand.jpg",
    duration: "6 Days / 5 Nights",
    description: "Uttarakhand, the 'Land of Gods' (Devbhoomi), is a sacred and scenic state in northern India. With the holy rivers Ganga and Yamuna, the spiritual towns of Haridwar and Rishikesh, and the stunning hill stations of Nainital and Mussoorie, Uttarakhand perfectly blends pilgrimage, adventure, and nature.",
    highlights: [
      "Ganga Aarti at Har Ki Pauri, Haridwar",
      "River Rafting in Rishikesh",
      "Laxman Jhula & Ram Jhula",
      "Beatles Ashram Rishikesh",
      "Nainital Naini Lake Boating",
      "Snow View Point Nainital",
      "Mall Road Mussoorie",
      "Kempty Falls"
    ],
    itinerary: [
      "Day 1: Arrive Haridwar – Har Ki Pauri Ganga Aarti – Mansa Devi Temple",
      "Day 2: Haridwar to Rishikesh – Laxman Jhula, Ram Jhula, Beatles Ashram, Parmarth Niketan",
      "Day 3: River Rafting in Rishikesh – Bungee Jumping Option – Evening Yoga Class",
      "Day 4: Rishikesh to Nainital (5-6 hrs) – Naini Lake Evening Boating",
      "Day 5: Nainital – Snow View Point, Zoo, Eco Cave Gardens, Mall Road",
      "Day 6: Nainital to Delhi/Dehradun – Departure"
    ],
    includes: [
      "5 Nights Hotel Stay",
      "Daily Breakfast",
      "All Transfers by Car",
      "Ganga Aarti Darshan",
      "River Rafting (Grade 3-4)",
      "Naini Lake Boating",
      "All Toll & Parking"
    ],
    excludes: [
      "Airfare / Train Fare",
      "Lunch & Dinner",
      "Bungee Jumping / Zip Line",
      "Personal Expenses",
      "Camera Fees at Monuments",
      "Any item not mentioned"
    ]
  },
  {
    id: "kerala",
    name: "Kerala",
    price: "₹14,999",
    image: "/kerala.jpg",
    duration: "5 Days / 4 Nights",
    description: "God's Own Country — Kerala is India's most serene and lush destination. The gently swaying coconut palms, tranquil backwaters, misty tea-covered hills of Munnar, pristine beaches, and Ayurvedic wellness traditions make Kerala an experience that rejuvenates the soul. A perfect escape for couples, families, and nature lovers.",
    highlights: [
      "Alleppey Houseboat Backwater Cruise",
      "Munnar Tea & Spice Plantation",
      "Kovalam & Varkala Beach",
      "Thekkady Wildlife Sanctuary",
      "Kathakali Cultural Show",
      "Kochi Fort & Chinese Fishing Nets",
      "Ayurvedic Massage & Spa",
      "Periyar Lake Boat Ride"
    ],
    itinerary: [
      "Day 1: Arrive Kochi – Fort Kochi, Chinese Fishing Nets, Dutch Palace, Kathakali Show",
      "Day 2: Kochi to Munnar (4 hrs) – Tea Gardens, Eravikulam National Park, Attukal Waterfalls",
      "Day 3: Munnar to Alleppey (4 hrs) – Houseboat Check-in – Backwater Cruise – Overnight Houseboat",
      "Day 4: Houseboat Checkout – Alleppey to Kovalam Beach (3 hrs) – Beach Evening",
      "Day 5: Kovalam – Lighthouse Beach – Ayurvedic Treatment – Departure from Trivandrum"
    ],
    includes: [
      "4 Nights Stay (Hotel + Houseboat)",
      "All Meals on Houseboat",
      "Breakfast at Hotels",
      "All Transfers by AC Car",
      "All Sightseeing",
      "Kathakali Show Entry"
    ],
    excludes: [
      "Airfare / Train Fare",
      "Lunch & Dinner (except houseboat)",
      "Ayurvedic Treatments",
      "Periyar Boat Ride",
      "Personal Expenses",
      "Any item not mentioned"
    ]
  },
  {
    id: "northeast",
    name: "Seven Sisters",
    price: "₹64,999",
    image: "/northeast.jpg",
    duration: "9 Days / 8 Nights",
    description: "The Seven Sisters of Northeast India — Assam, Meghalaya, Manipur, Mizoram, Nagaland, Tripura, and Arunachal Pradesh — are India's best-kept secret. From the world's wettest place Cherrapunjee to the one-horned rhinos of Kaziranga, from the living root bridges to the pristine Dawki river, Northeast India is a land of extraordinary wonders.",
    highlights: [
      "Kaziranga National Park Rhino Safari",
      "Cherrapunjee Living Root Bridge Trek",
      "Dawki Transparent River Boat Ride",
      "Mawlynnong (Asia's Cleanest Village)",
      "Shillong Peak & Elephant Falls",
      "Majuli River Island (World's Largest)",
      "Kamakhya Temple Guwahati",
      "Loktak Lake Manipur"
    ],
    itinerary: [
      "Day 1: Arrive Guwahati – Kamakhya Temple – Umananda Island – Transfer to Kaziranga",
      "Day 2: Kaziranga National Park – Morning & Afternoon Jeep Safari (Rhinos, Elephants, Tigers)",
      "Day 3: Kaziranga Elephant Safari – Transfer to Shillong (4 hrs)",
      "Day 4: Shillong – Elephant Falls, Shillong Peak, Ward's Lake, Police Bazar",
      "Day 5: Cherrapunjee – Nohkalikai Falls, Mawsmai Cave, Seven Sisters Falls",
      "Day 6: Living Root Bridge Trek – Mawlynnong Village – Dawki River",
      "Day 7: Return Guwahati – Majuli Island Day Trip",
      "Day 8: Guwahati Local – Brahmaputra River Cruise – Shopping",
      "Day 9: Departure"
    ],
    includes: [
      "8 Nights Hotel & Resort Stay",
      "Breakfast & Dinner Daily",
      "All Transfers & Sightseeing",
      "Kaziranga Jeep & Elephant Safari",
      "All Entry Permits",
      "All Toll & Parking"
    ],
    excludes: [
      "Airfare",
      "Lunch",
      "Camera Fees",
      "Personal Expenses",
      "Any optional activities",
      "Any item not mentioned"
    ]
  },
  {
    id: "varanasi",
    name: "Varanasi & Ayodhya",
    price: "₹24,999",
    image: "/varanasi.jpg",
    duration: "5 Days / 4 Nights",
    description: "Varanasi, the spiritual capital of India, is one of the world's oldest living cities. Sitting on the banks of the sacred Ganges, Varanasi is a city of temples, ghats, silk, and philosophy. Combined with Ayodhya — the birthplace of Lord Ram and a city of immense religious significance — this tour is a deeply moving spiritual journey.",
    highlights: [
      "Ganga Aarti at Dashashwamedh Ghat",
      "Sunrise Boat Ride on the Ganges",
      "Kashi Vishwanath Temple",
      "Sarnath Buddhist Site",
      "Ram Janmabhoomi Temple, Ayodhya",
      "Hanuman Garhi Temple",
      "Saryu River Aarti",
      "Banaras Silk Weaving Workshop"
    ],
    itinerary: [
      "Day 1: Arrive Varanasi – Ghat Walk – Evening Ganga Aarti at Dashashwamedh Ghat",
      "Day 2: Sunrise Boat Ride – Assi Ghat to Manikarnika Ghat – Kashi Vishwanath Temple",
      "Day 3: Sarnath – Dhamek Stupa, Sarnath Museum, Mulagandha Kuti Vihara",
      "Day 4: Varanasi to Ayodhya (3 hrs) – Ram Janmabhoomi Temple, Hanuman Garhi, Kanak Bhawan – Evening Saryu Aarti",
      "Day 5: Ayodhya – Ram Ki Paidi – Return to Varanasi – Departure"
    ],
    includes: [
      "4 Nights Hotel Stay",
      "Daily Breakfast",
      "All Transfers by Car",
      "Sunrise Boat Ride on Ganges",
      "Ganga Aarti Darshan",
      "Sarnath Sightseeing",
      "Ayodhya Temple Tour"
    ],
    excludes: [
      "Airfare / Train Fare",
      "Lunch & Dinner",
      "Temple Donation & Puja",
      "Personal Expenses",
      "Camera Fees",
      "Any item not mentioned"
    ]
  },
  {
    id: "nepal",
    name: "Nepal",
    price: "₹45,999",
    image: "/nepal.jpg",
    duration: "6 Days / 5 Nights",
    description: "Nepal, the land of the Himalayas and Buddha, is a country of profound spiritual energy and breathtaking landscapes. Home to 8 of the world's 10 highest peaks including Mount Everest, Nepal offers an unmatched mix of trekking, ancient temples, mountain views, and rich culture. Kathmandu and Pokhara are among Asia's most fascinating cities.",
    highlights: [
      "Pashupatinath Temple (UNESCO)",
      "Boudhanath Stupa (UNESCO)",
      "Swayambhunath Monkey Temple",
      "Everest View Flight / Trek",
      "Pokhara Phewa Lake Boating",
      "Sarangkot Sunrise View",
      "Nagarkot Sunrise over Himalayas",
      "Bhaktapur Durbar Square (UNESCO)"
    ],
    itinerary: [
      "Day 1: Arrive Kathmandu – Pashupatinath Temple – Boudhanath Stupa – Hotel Check-in",
      "Day 2: Swayambhunath, Kathmandu Durbar Square, Thamel Market",
      "Day 3: Nagarkot Sunrise – Bhaktapur Durbar Square – Changu Narayan Temple",
      "Day 4: Fly / Drive to Pokhara – Bindhyabasini Temple – Lakeside Evening",
      "Day 5: Sarangkot Sunrise – Phewa Lake Boating – Davi's Falls – World Peace Stupa",
      "Day 6: Pokhara to Kathmandu – Departure"
    ],
    includes: [
      "5 Nights Hotel Stay",
      "Daily Breakfast",
      "All Transfers & Sightseeing",
      "Phewa Lake Boat Ride",
      "English Speaking Guide",
      "All Toll & Parking"
    ],
    excludes: [
      "Airfare",
      "Nepal Visa Fee (₹1500 approx)",
      "Lunch & Dinner",
      "Everest Mountain Flight",
      "Personal Expenses",
      "Any item not mentioned"
    ]
  },
  {
    id: "singapore",
    name: "Singapore",
    price: "₹59,999",
    image: "/singapore.jpg",
    duration: "5 Days / 4 Nights",
    description: "Singapore — the Lion City — is a dazzling fusion of cultures, cuisines, and world-class attractions. This tiny island nation packs an enormous punch with its iconic skyline, futuristic gardens, thrilling theme parks, and vibrant street food scene. Clean, safe, and incredibly efficient, Singapore is one of Asia's most beloved destinations.",
    highlights: [
      "Gardens by the Bay & Supertree Grove",
      "Universal Studios Singapore",
      "Sentosa Island",
      "Marina Bay Sands SkyPark",
      "Singapore Zoo & Night Safari",
      "Clarke Quay Nightlife",
      "Chinatown & Little India",
      "S.E.A. Aquarium"
    ],
    itinerary: [
      "Day 1: Arrive Singapore – City Orientation Tour – Merlion Park – Clarke Quay",
      "Day 2: Universal Studios Singapore – Full Day",
      "Day 3: Sentosa Island – S.E.A. Aquarium, Cable Car, Beaches",
      "Day 4: Gardens by the Bay – Marina Bay Sands SkyPark – Chinatown – Little India",
      "Day 5: Singapore Zoo or Free Shopping at Orchard Road – Departure"
    ],
    includes: [
      "4 Nights Hotel Stay",
      "Daily Breakfast",
      "Airport Transfers",
      "Universal Studios Ticket",
      "Gardens by the Bay Ticket",
      "City Tour"
    ],
    excludes: [
      "Airfare",
      "Singapore Visa",
      "Lunch & Dinner",
      "Night Safari",
      "Personal Expenses",
      "Any item not mentioned"
    ]
  },
  {
    id: "vietnam",
    name: "Vietnam",
    price: "₹65,999",
    image: "/vietnam.jpg",
    duration: "7 Days / 6 Nights",
    description: "Vietnam is a country of extraordinary beauty — from the emerald waters of Ha Long Bay to the lantern-lit streets of Hoi An, from the bustling metropolis of Ho Chi Minh City to the misty hills of Sapa. With a fascinating history, delicious street food, and incredibly warm people, Vietnam is one of Southeast Asia's most captivating destinations.",
    highlights: [
      "Ha Long Bay 2D/1N Cruise",
      "Hoi An Ancient Town (UNESCO)",
      "My Son Sanctuary",
      "Ho Chi Minh City Tour",
      "Cu Chi Tunnels",
      "Mekong Delta Boat Ride",
      "Hanoi Old Quarter",
      "Hoan Kiem Lake"
    ],
    itinerary: [
      "Day 1: Arrive Hanoi – Old Quarter Walk – Hoan Kiem Lake – Ngoc Son Temple",
      "Day 2: Hanoi to Ha Long Bay – Cruise Check-in – Kayaking – Cave Visit – Overnight Cruise",
      "Day 3: Ha Long Bay Sunrise – Return Hanoi – Fly to Da Nang",
      "Day 4: Hoi An Ancient Town – Lantern Street – Tailor Shop – My Son Sanctuary",
      "Day 5: Da Nang – Golden Bridge (Ba Na Hills) – Marble Mountains – Fly to HCMC",
      "Day 6: Ho Chi Minh City – War Remnants Museum – Cu Chi Tunnels – Ben Thanh Market",
      "Day 7: Mekong Delta Day Trip – Boat Ride – Departure"
    ],
    includes: [
      "6 Nights Stay (Hotels + Ha Long Cruise)",
      "Daily Breakfast",
      "Ha Long Bay Overnight Cruise with All Meals",
      "All Internal Flights",
      "All Transfers & Sightseeing",
      "Cu Chi Tunnels Entry"
    ],
    excludes: [
      "International Airfare",
      "Vietnam Visa (e-Visa approx ₹2000)",
      "Lunch & Dinner (except cruise)",
      "Ba Na Hills Cable Car",
      "Personal Expenses",
      "Any item not mentioned"
    ]
  },
  {
    id: "dubai",
    name: "Dubai",
    price: "₹49,999",
    image: "/dubai.jpg",
    duration: "5 Days / 4 Nights",
    description: "Dubai — where the impossible becomes possible. This ultramodern emirate has reinvented itself as the world's most glamorous destination. Home to the world's tallest building (Burj Khalifa), the world's largest mall, and some of the most luxurious hotels on the planet, Dubai seamlessly blends ancient Arabian culture with futuristic vision.",
    highlights: [
      "Burj Khalifa At the Top (124th Floor)",
      "Desert Safari with BBQ & Belly Dance",
      "Dubai Mall & Dubai Fountain Show",
      "Palm Jumeirah & Atlantis View",
      "Dubai Frame",
      "Gold Souk & Spice Souk",
      "Dhow Cruise Dinner on Dubai Creek",
      "Miracle Garden / Global Village"
    ],
    itinerary: [
      "Day 1: Arrive Dubai – Check-in – Evening Gold Souk & Dubai Creek",
      "Day 2: Burj Khalifa, Dubai Mall, Dubai Fountain Show – Dhow Cruise Dinner",
      "Day 3: Desert Safari – Dune Bashing, Camel Ride, Sandboarding – BBQ Dinner with Entertainment",
      "Day 4: Palm Jumeirah, Atlantis Drive-by, Dubai Frame, JBR Beach Walk",
      "Day 5: Global Village / Miracle Garden (seasonal) – Duty Free Shopping – Departure"
    ],
    includes: [
      "4 Nights 4-Star Hotel Stay",
      "Daily Breakfast",
      "Airport Transfers",
      "Burj Khalifa Ticket (124th Floor)",
      "Desert Safari with BBQ Dinner",
      "Dhow Cruise Dinner"
    ],
    excludes: [
      "Airfare",
      "Dubai Visa (approx ₹5,500)",
      "Lunch & Dinner (except included)",
      "Atlantis Aquaventure",
      "Personal Expenses",
      "Any item not mentioned"
    ]
  },
  {
    id: "baku",
    name: "Baku",
    price: "₹44,999",
    image: "/baku.jpg",
    duration: "5 Days / 4 Nights",
    description: "Baku, the capital of Azerbaijan, is one of the world's most surprising travel destinations. This 'City of Wind' sits on the Caspian Sea and presents a fascinating contrast between its ancient walled city and ultra-modern architecture. From the iconic Flame Towers to the medieval Old City, from mud volcanoes to the eternal fires of Yanar Dag, Baku is unlike anywhere else.",
    highlights: [
      "Flame Towers (Iconic Landmark)",
      "Icherisheher Old City (UNESCO)",
      "Maiden Tower",
      "Gobustan National Park & Petroglyphs",
      "Mud Volcanoes of Gobustan",
      "Yanar Dag (Burning Mountain)",
      "Heydar Aliyev Centre (Architecture)",
      "Baku Boulevard & Caspian Sea"
    ],
    itinerary: [
      "Day 1: Arrive Baku – Flame Towers View – Baku Boulevard – Caspian Seafront",
      "Day 2: Icherisheher (Old City) – Maiden Tower, Palace of Shirvanshahs, Carpet Museum",
      "Day 3: Gobustan National Park – Rock Petroglyphs, Mud Volcanoes Tour",
      "Day 4: Yanar Dag – Ateshgah Fire Temple – Heydar Aliyev Centre – Shopping at Nizami Street",
      "Day 5: Absheron Peninsula Tour – Departure"
    ],
    includes: [
      "4 Nights Hotel Stay",
      "Daily Breakfast",
      "Airport Transfers",
      "All Sightseeing & Tours",
      "Gobustan Tour with Guide",
      "All Toll & Parking"
    ],
    excludes: [
      "Airfare",
      "Azerbaijan Visa (e-Visa approx ₹3,500)",
      "Lunch & Dinner",
      "Personal Expenses",
      "Museum Entry Fees",
      "Any item not mentioned"
    ]
  },
  {
    id: "srilanka",
    name: "Sri Lanka",
    price: "₹34,999",
    image: "/srilanka.jpg",
    duration: "6 Days / 5 Nights",
    description: "Sri Lanka, the 'Pearl of the Indian Ocean', is a teardrop-shaped island nation of extraordinary beauty. Ancient ruins and rock fortresses, misty highlands covered in tea plantations, pristine beaches, vibrant wildlife, and warm smiling people — Sri Lanka packs an incredible diversity of experiences into one small island.",
    highlights: [
      "Sigiriya Lion Rock Fortress (UNESCO)",
      "Dambulla Cave Temple (UNESCO)",
      "Kandy Temple of the Sacred Tooth Relic",
      "Nuwara Eliya Tea Plantation Tour",
      "Yala National Park Leopard Safari",
      "Mirissa Whale Watching",
      "Galle Fort (UNESCO)",
      "Pinnawala Elephant Orphanage"
    ],
    itinerary: [
      "Day 1: Arrive Colombo – Transfer to Sigiriya (4 hrs) – Evening village walk",
      "Day 2: Sigiriya Rock Fortress Climb – Dambulla Cave Temple – Transfer to Kandy",
      "Day 3: Kandy – Temple of Tooth, Peradeniya Botanical Gardens, Kandyan Cultural Show",
      "Day 4: Kandy to Nuwara Eliya – Tea Factory Visit, Gregory Lake, Hakgala Gardens",
      "Day 5: Nuwara Eliya to Yala (4 hrs) – Yala National Park Safari (Leopards, Elephants)",
      "Day 6: Mirissa Beach – Whale Watching (seasonal) – Galle Fort – Departure"
    ],
    includes: [
      "5 Nights Hotel Stay",
      "Daily Breakfast",
      "All Transfers by AC Car",
      "Yala Jeep Safari",
      "All Sightseeing",
      "All Toll & Parking"
    ],
    excludes: [
      "Airfare",
      "Sri Lanka ETA Visa (approx ₹2,500)",
      "Lunch & Dinner",
      "Whale Watching",
      "Personal Expenses",
      "Any item not mentioned"
    ]
  },
  {
    id: "maldives",
    name: "Maldives",
    price: "₹85,000",
    image: "/maldives.jpg",
    duration: "5 Days / 4 Nights",
    description: "The Maldives is Earth's last paradise — a necklace of 1,200 coral islands draped across the turquoise Indian Ocean. With its overwater bungalows, crystal-clear lagoons, vibrant coral reefs, and powder-white beaches, the Maldives is the ultimate luxury escape. Whether you're celebrating a honeymoon, anniversary, or simply indulging yourself, the Maldives delivers pure magic.",
    highlights: [
      "Overwater Villa / Beach Villa Stay",
      "Snorkeling in Coral Reefs",
      "Scuba Diving (PADI certified site)",
      "Sunset Dolphin Cruise",
      "Underwater Restaurant Experience",
      "Glass Bottom Kayaking",
      "Private Beach Dinners",
      "Whale Shark Snorkeling"
    ],
    itinerary: [
      "Day 1: Arrive Male – Speedboat Transfer to Resort – Welcome Drink – Check-in Overwater Villa",
      "Day 2: Morning Snorkeling at House Reef – Afternoon Water Sports – Sunset Dolphin Cruise",
      "Day 3: Scuba Diving / Whale Shark Snorkeling Excursion – Private Beach Lunch",
      "Day 4: Glass Bottom Kayaking – Island Hopping – Underwater Restaurant Dinner",
      "Day 5: Sunrise on the Deck – Checkout – Speedboat to Male – Departure"
    ],
    includes: [
      "4 Nights Overwater / Beach Villa",
      "All Meals (Full Board)",
      "Speedboat Airport Transfers",
      "Snorkeling Equipment",
      "Sunset Dolphin Cruise",
      "Non-Motorized Water Sports"
    ],
    excludes: [
      "Airfare",
      "Scuba Diving Charges",
      "Spa & Wellness Treatments",
      "Motorized Water Sports",
      "Personal Expenses",
      "Any item not mentioned"
    ]
  },
  {
    id: "bali",
    name: "Bali",
    price: "₹65,999",
    image: "/bali.jpg",
    duration: "6 Days / 5 Nights",
    description: "Bali, the 'Island of the Gods', is Indonesia's crown jewel — a place where ancient Hindu temples perch on dramatic cliffsides, emerald rice terraces cascade down hillsides, and surf breaks roll in from the Indian Ocean. With its spiritual energy, artistic culture, world-class spas, and incredible food scene, Bali is a destination that feeds the soul.",
    highlights: [
      "Uluwatu Temple Kecak Fire Dance",
      "Tegallalang Rice Terraces",
      "Mount Batur Sunrise Trek",
      "Seminyak & Kuta Beach",
      "Ubud Monkey Forest",
      "Tanah Lot Temple at Sunset",
      "Tirta Empul Holy Spring Temple",
      "Balinese Cooking Class"
    ],
    itinerary: [
      "Day 1: Arrive Bali – Kuta Beach – Sunset at Tanah Lot Temple",
      "Day 2: Ubud – Monkey Forest, Tegallalang Rice Terraces, Tirta Empul, Art Market",
      "Day 3: Mount Batur Sunrise Trek (2am start) – Return to Hotel – Afternoon Spa",
      "Day 4: Uluwatu Temple – Padang Padang Beach – Kecak Fire Dance at Sunset",
      "Day 5: Seminyak – Beach Club, Shopping, Water Sports – Farewell Dinner",
      "Day 6: Tanah Lot Sunrise – Balinese Cooking Class (optional) – Departure"
    ],
    includes: [
      "5 Nights Hotel / Villa Stay",
      "Daily Breakfast",
      "Airport Transfers",
      "All Sightseeing & Tours",
      "Mount Batur Trek Guide",
      "Kecak Dance Entry"
    ],
    excludes: [
      "Airfare",
      "Visa on Arrival (approx ₹2,000)",
      "Lunch & Dinner",
      "Spa Treatments",
      "Personal Expenses",
      "Any item not mentioned"
    ]
  },
  {
    id: "thailand",
    name: "Thailand",
    price: "₹45,999",
    image: "/thailand.jpg",
    duration: "6 Days / 5 Nights",
    description: "Thailand — the Land of Smiles — is Southeast Asia's most beloved destination. From the dazzling temples of Bangkok to the turquoise waters of Phuket, from the elephant sanctuaries of Chiang Mai to the floating markets of the central plains, Thailand offers a perfect mix of culture, adventure, beaches, and incredible food that keeps travelers coming back again and again.",
    highlights: [
      "Grand Palace & Wat Phra Kaew, Bangkok",
      "Phi Phi Islands Boat Tour",
      "Elephant Sanctuary, Chiang Mai",
      "Floating Market Tour",
      "Wat Arun & Wat Pho (Reclining Buddha)",
      "Patong Beach, Phuket",
      "James Bond Island Tour",
      "Thai Street Food Tour"
    ],
    itinerary: [
      "Day 1: Arrive Bangkok – Thai Street Food Tour – Khao San Road Evening",
      "Day 2: Grand Palace, Wat Phra Kaew, Wat Pho – Chao Phraya River Cruise – Wat Arun",
      "Day 3: Floating Market – Damnoen Saduak – Fly to Phuket – Patong Beach",
      "Day 4: Phi Phi Islands Full Day Boat Tour – Snorkeling – Maya Bay",
      "Day 5: James Bond Island Tour – Phang Nga Bay Kayaking – Tiger Kingdom",
      "Day 6: Phuket – Big Buddha – Chalong Temple – Shopping – Departure"
    ],
    includes: [
      "5 Nights Hotel Stay",
      "Daily Breakfast",
      "All Transfers & Tours",
      "Phi Phi Islands Boat Trip",
      "James Bond Island Tour",
      "Bangkok – Phuket Internal Flight"
    ],
    excludes: [
      "International Airfare",
      "Thailand Visa (if applicable)",
      "Lunch & Dinner",
      "Elephant Sanctuary Fee",
      "Personal Expenses",
      "Any item not mentioned"
    ]
  }
];

export default toursData;