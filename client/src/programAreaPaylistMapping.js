const paylistMapping = {
    "Strategic Services Branch - Strategic Partnerships and Communications": "031-7251",
    "Strategic Services Branch - Strategic Projects & Technology Support": "031-7254",
    "Strategic Services Branch - Knowledge Management": "031-7242",
    "Prevention and Loss Management Services - Criminal Investigation Unit": "031-7372",
    "Prevention and Loss Management Services - Operations Management": "031-2226",
    "Prevention and Loss Management Services - Vancouver Island PLMS - Victoria": "031-2602",
    "Prevention and Loss Management Services - Vancouver Island PLMS - Nanaimo": "031-2603",
    "Prevention and Loss Management Services - START Task Team": "031-7373",
    "Prevention and Loss Management Services - Vancouver Coastal PLMS - Vancouver North": "031-1556",
    "Prevention and Loss Management Services - Fraser PLMS - Fraser West": "031-1935",
    "Prevention and Loss Management Services - Fraser PLMS - Fraser East": "031-1936",
    "Prevention and Loss Management Services - Interior PLMS - Kelowna": "031-2209",
    "Prevention and Loss Management Services - North PLMS Regional Office": "031-2308",
    "Prevention and Loss Management Services - Vancouver Coastal PLMS - Vancouver South": "031-1557",
    "Prevention and Loss Management Services - Eligibility Reviews": "031-7374",
    "Prevention and Loss Management Services - Service Quality Unit": "031-7295",
    "Prevention and Loss Management Services - Program Integrity & Evaluation": "031-9020",
    "Prevention and Loss Management Services - Program Evaluation": "031-9025",
    "Prevention and Loss Management Services - Program Support": "031-9024",
    "Operations Support - Finance, Contracts and Records Management": "031-2604",
    "Operations Support - Records Management": "031-2319",
    "Operations Support - Recruitment, Staffing, Facilities and Assets": "031-2605",
    "Operations Support - Analytics and Business Intelligence": "031-2614",
    "Operations Support - Communications, Engagement and Organizational Health": "031-2615",
    "Virtual Services - Intake": "031-2212",
    "Virtual Services - Specialized Intake": "031-2213",
    "Virtual Services - Management Intake": "031-2211",
    "Virtual Services - Employment Plans": "031-1911",
    "Virtual Services - Special Care Faclities": "031-2215",
    "Virtual Services - Management Health and Specialized Services": "031-2217",
    "Virtual Services - Case Reviews": "031-1912",
    "Virtual Services - OAS-GIS": "031-1913",
    "Virtual Services - Disablility Applications": "031-7265",
    "Virtual Services - Medical Equipment and Supplies": "031-7343",
    "Virtual Services - Medical Transportation": "031-7344",
    "Virtual Services - Health Resource Team": "031-7345",
    "Virtual Services - Funeral Services": "031-1915",
    "Virtual Services - Bus Pass": "031-7346",
    "Virtual Services - Management Contact Centre": "031-1961",
    "Virtual Services - Victoria CC": "031-7370",
    "Virtual Services - Lower Mainland  CC": "031-1960",
    "Virtual Services - Kamloops CC": "031-2202",
    "Virtual Services - PG CC": "031-2363",
    "Virtual Services - After Hours": "031-2711",
    "Virtual Services - Chilliwack Contact Centre": "031-1962",
    "Community Integration Services - Management": "031-7801",
    "Community Integration Services - Performance and Reporting": "031-7802",
    "Community Integration Services - Practice and Partnerships": "031-7803",
    "Community Integration Services - Management Service Delivery": "031-7804",
    "Community Integration Services - Van Island South": "031-2647",
    "Community Integration Services - Fraser North": "031-1577",
    "Community Integration Services - Fraser Surrey": "031-1578",
    "Community Integration Services - Interior North": "031-2335",
    "Community Integration Services - North": "031-2309",
    "Community Integration Services - Van Downtown/DTES": "031-1522",
    "Community Integration Services - Van Island Central/North": "031-7805",
    "Community Integration Services - Interior South": "031-7806",
    "Community Integration Services - Van East/South Richmond": "031-7807",
    "Community Integration Services - Van North Sunshine Sea-Sky": "031-7808",
    "Community Integration Services - Fraser South": "031-7809",
    "Community Services - Management": "031-1705",
    "Community Services - Vefra - Victoria": "031-2646",
    "Community Services - Gateway - Victoria": "031-2651",
    "Community Services - Nanaimo South": "031-2521",
    "Community Services - Nanaimo North": "031-2529",
    "Community Services - Port Alberni": "031-2533",
    "Community Services - Abbotsford": "031-1862",
    "Community Services - Courtenay": "031-2552",
    "Community Services - Powell River": "031-2553",
    "Community Services - Campbell River": "031-2554",
    "Community Services - Duncan": "031-2570",
    "Community Services - Mission": "031-1866",
    "Community Services - Maple Ridge": "031-1859",
    "Community Services - Sechelt": "031-1734",
    "Community Services - Reports, Utilities and ID Team": "031-2513",
    "Community Services - Langley": "031-1953",
    "Community Services - Chilliwack": "031-1863",
    "Community Services - Hope": "031-1865",
    "Community Services - Tri-Cities": "031-1857",
    "Community Services - Management": "031-1902",
    "Community Services - Cranbrook": "031-2153",
    "Community Services - Grand Forks SBC": "031-2141",
    "Community Services - Trail": "031-2143",
    "Community Services - Nelson": "031-2144",
    "Community Services - Oliver": "031-2137",
    "Community Services - Penticton": "031-2131",
    "Community Services - Westbank": "031-2123",
    "Community Services - Kelowna": "031-2127",
    "Community Services - Vernon": "031-2253",
    "Community Services - Salmon Arm": "031-2242",
    "Community Services - Kamloops South": "031-2221",
    "Community Services - Kamloops North": "031-2224",
    "Community Services - Merritt SBC": "031-2236",
    "Community Services - 100 Mile House": "031-2237",
    "Community Services - Williams Lake": "031-2273",
    "Community Services - Quesnel": "031-2277",
    "Community Services - Dawson Creek": "031-2342",
    "Community Services - Fort St John": "031-2345",
    "Community Services - Prince George": "031-2365",
    "Community Services - Vanderhoof SBC": "031-2374",
    "Community Services - Smithers": "031-2311",
    "Community Services - Terrace": "031-2322",
    "Community Services - Prince Rupert": "031-2332",
    "Community Services - Provincial Profiling Team": "031-1576",
    "Community Services - Service BC Support Team": "031-2307",
    "Community Services - Change in Circumstance Team": "031-2316",
    "Community Services - File Review Team": "031-2317",
    "Community Services - Admin Underpayment Team": "031-2318",
    "Community Services - AEU - Administrative Error Underpayment": "031-2326",
    "Community Services - Management": "031-2573",
    "Community Services - Richmond": "031-1737",
    "Community Services - Dockside": "031-1561",
    "Community Services - Strathcona": "031-1563",
    "Community Services - Kiwassa": "031-1564",
    "Community Services - Grandview": "031-1567",
    "Community Services - New Westminster": "031-1854",
    "Community Services - Mountainview": "031-1575",
    "Community Services - West End": "031-1523",
    "Community Services - Burnaby Metro Pointe": "031-1715",
    "Community Services - North Van": "031-1730",
    "Community Services - Fleetwood": "031-1952",
    "Community Services - Surrey North": "031-1941",
    "Community Services - Park Place": "031-1957"
  };
  
  export default paylistMapping;
  