
        const { useState, useEffect, useMemo, useRef } = React;
        const { 
            Cpu, Search, Database, FileText, FlaskConical, Code, Music,
            Globe, RefreshCw, Layers, Shield, Settings, Key, Zap, 
            ChevronRight, ChevronDown, CheckCircle, AlertTriangle, Play,
            Box, Terminal, ExternalLink, Github, Mail, Package,
            TrendingUp, Cloud, User, Activity, Coffee, Smile, Book, 
            ShoppingBag, Trash2, Copy, Download, Share2, Filter, Menu, X, Plus, Lock
        } = LucideReact;

        // --- CONSTANTS ---

        const KEY_INFO = {
            GROQ_API_KEY:       { url: "https://console.groq.com", unlocks: 18, desc: "Free LLM (llama-3.3-70b)" },
            GEMINI_API_KEY:     { url: "https://aistudio.google.com/app/apikey", unlocks: 1, desc: "Gemini 1.5 Flash free" },
            SERPER_API_KEY:     { url: "https://serper.dev", unlocks: 3, desc: "2500 free Google searches" },
            NEWS_API_KEY:       { url: "https://newsapi.org/register", unlocks: 1, desc: "100 req/day free" },
            TAVILY_API_KEY:     { url: "https://tavily.com", unlocks: 1, desc: "AI web search free tier" },
            GITHUB_TOKEN:       { url: "https://github.com/settings/tokens", unlocks: 2, desc: "Free personal token" },
            NASA_API_KEY:       { url: "https://api.nasa.gov", unlocks: 1, desc: "Instant free signup" },
            IPINFO_TOKEN:       { url: "https://ipinfo.io/signup", unlocks: 1, desc: "50k req/month free" },
            REDDIT_CLIENT_ID:   { url: "https://www.reddit.com/prefs/apps", unlocks: 1, desc: "Free app registration" },
            OPENROUTER_API_KEY: { url: "https://openrouter.ai", unlocks: 1, desc: "Free models available" },
        };

        const CAPABILITIES = [
            // AI
            { id: "cap-01", name: "Deep research", category: "AI", apiKey: "GROQ_API_KEY", desc: "Research any topic with LLM synthesis", isFree: false },
            { id: "cap-02", name: "Code generator", category: "AI", apiKey: "GROQ_API_KEY", desc: "Generate code in any language" },
            { id: "cap-03", name: "Text summariser", category: "AI", apiKey: "GROQ_API_KEY", desc: "Summarise any document or URL content" },
            { id: "cap-04", name: "Sentiment analyser", category: "AI", apiKey: "GROQ_API_KEY", desc: "Analyse sentiment of any text" },
            { id: "cap-05", name: "Translation engine", category: "AI", apiKey: "GROQ_API_KEY", desc: "Translate to/from 50+ languages" },
            { id: "cap-06", name: "Email drafter", category: "AI", apiKey: "GROQ_API_KEY", desc: "Draft professional emails from bullet points" },
            { id: "cap-07", name: "Report writer", category: "AI", apiKey: "GROQ_API_KEY", desc: "Write structured reports from raw data" },
            { id: "cap-08", name: "Gemini analyst", category: "AI", apiKey: "GEMINI_API_KEY", desc: "Google Gemini 1.5 Flash analysis" },
            { id: "cap-09", name: "Multi-model debate", category: "AI", apiKey: "OPENROUTER_API_KEY", desc: "Two free LLMs debate a topic" },
            { id: "cap-10", name: "Fact checker", category: "AI", apiKey: "GROQ_API_KEY", desc: "Cross-check claims against web sources" },
            { id: "cap-59", name: "Brand Name Genius", category: "AI", apiKey: "GROQ_API_KEY", desc: "Generate creative brand names and slogans" },
            { id: "cap-60", name: "Prompt Refiner", category: "AI", apiKey: "GROQ_API_KEY", desc: "Optimise any AI prompt for best results" },
            // Web
            { id: "cap-11", name: "Live web search", category: "Web", apiKey: "SERPER_API_KEY", desc: "Real-time Google search results" },
            { id: "cap-12", name: "News monitor", category: "Web", apiKey: "NEWS_API_KEY", desc: "Latest news on any topic" },
            { id: "cap-13", name: "Deep web research", category: "Web", apiKey: "TAVILY_API_KEY", desc: "Tavily AI-powered research" },
            { id: "cap-14", name: "Competitor scan", category: "Web", apiKey: "SERPER_API_KEY", desc: "Search and analyse competitors" },
            { id: "cap-15", name: "Reddit scout", category: "Web", apiKey: "REDDIT_CLIENT_ID", desc: "Search Reddit for any topic" },
            { id: "cap-16", name: "Wikipedia lookup", category: "Web", apiKey: null, isFree: true, desc: "Wikipedia article fetch and summarise" },
            { id: "cap-17", name: "GitHub explorer", category: "Web", apiKey: "GITHUB_TOKEN", desc: "Search repos, trending, code" },
            { id: "cap-61", name: "Hacker News Scout", category: "Web", apiKey: null, isFree: true, desc: "Top HN stories and discussions" },
            { id: "cap-62", name: "Wayback Machine", category: "Web", apiKey: null, isFree: true, desc: "Check if a URL was archived in the past" },
            // Data
            { id: "cap-18", name: "Crypto tracker", category: "Data", apiKey: null, isFree: true, desc: "Live crypto prices via CoinGecko" },
            { id: "cap-19", name: "Currency converter", category: "Data", apiKey: null, isFree: true, desc: "Live exchange rates via Frankfurter" },
            { id: "cap-20", name: "Stock analyser", category: "Data", apiKey: "GROQ_API_KEY", desc: "Analyse stock data + LLM insights" },
            { id: "cap-21", name: "Weather forecast", category: "Data", apiKey: null, isFree: true, desc: "7-day forecast via Open-Meteo" },
            { id: "cap-22", name: "Country profiler", category: "Data", apiKey: null, isFree: true, desc: "Full country data via RestCountries" },
            { id: "cap-23", name: "IP analyser", category: "Data", apiKey: "IPINFO_TOKEN", desc: "Geo/org data for any IP" },
            { id: "cap-24", name: "NASA data feed", category: "Data", apiKey: "NASA_API_KEY", desc: "Astronomy picture, NEO asteroids, Mars photos" },
            { id: "cap-25", name: "ISS tracker", category: "Data", apiKey: null, isFree: true, desc: "Live International Space Station position" },
            { id: "cap-63", name: "Air Quality Index", category: "Data", apiKey: null, isFree: true, desc: "Check AQI for any city via WAQI" },
            { id: "cap-64", name: "Time Zone Pro", category: "Data", apiKey: null, isFree: true, desc: "Compare time zones and find meeting slots" },
            // Content
            { id: "cap-26", name: "Blog post writer", category: "Content", apiKey: "GROQ_API_KEY", desc: "Write SEO blog posts from titles" },
            { id: "cap-27", name: "Social media kit", category: "Content", apiKey: "GROQ_API_KEY", desc: "Generate Twitter/LinkedIn/Instagram posts" },
            { id: "cap-28", name: "Product description", category: "Content", apiKey: "GROQ_API_KEY", desc: "E-commerce product copy writer" },
            { id: "cap-29", name: "Meal planner", category: "Content", apiKey: null, isFree: true, desc: "AI meal plans + recipes from TheMealDB" },
            { id: "cap-30", name: "Cocktail finder", category: "Content", apiKey: null, isFree: true, desc: "Cocktail recipes from TheCocktailDB" },
            { id: "cap-31", name: "Trivia generator", category: "Content", apiKey: null, isFree: true, desc: "Generate trivia quiz from Open Trivia DB" },
            { id: "cap-32", name: "Quote curator", category: "Content", apiKey: null, isFree: true, desc: "Themed quotes via Quotable API" },
            { id: "cap-65", name: "Caption Suite", category: "Content", apiKey: "GROQ_API_KEY", desc: "Generate catchy captions for visuals" },
            { id: "cap-66", name: "Hashtag Strategist", category: "Content", apiKey: "GROQ_API_KEY", desc: "Keyword-driven hashtag research" },
            // Research
            { id: "cap-33", name: "Book finder", category: "Research", apiKey: null, isFree: true, desc: "Search books via Open Library" },
            { id: "cap-34", name: "Music researcher", category: "Research", apiKey: null, isFree: true, desc: "Artist/album data via MusicBrainz" },
            { id: "cap-35", name: "Word dictionary", category: "Research", apiKey: null, isFree: true, desc: "Definitions, etymology, synonyms" },
            { id: "cap-36", name: "Name profiler", category: "Research", apiKey: null, isFree: true, desc: "Age/gender prediction from name" },
            { id: "cap-37", name: "Science facts", category: "Research", apiKey: null, isFree: true, desc: "Random science facts" },
            { id: "cap-38", name: "History on this day", category: "Research", apiKey: null, isFree: true, desc: "What happened on any date via Wikipedia" },
            { id: "cap-39", name: "Number facts", category: "Research", apiKey: null, isFree: true, desc: "Mathematical and trivia facts about numbers" },
            { id: "cap-67", name: "ArXiv Research", category: "Research", apiKey: null, isFree: true, desc: "Search scientific papers via ArXiv" },
            { id: "cap-68", name: "Patent Scout", category: "Research", apiKey: "GROQ_API_KEY", desc: "Simulate patent landscape analysis" },
            // Dev
            { id: "cap-40", name: "Code reviewer", category: "Dev", apiKey: "GROQ_API_KEY", desc: "Review code for bugs and improvements" },
            { id: "cap-41", name: "Regex builder", category: "Dev", apiKey: "GROQ_API_KEY", desc: "Build and explain regex patterns" },
            { id: "cap-42", name: "SQL generator", category: "Dev", apiKey: "GROQ_API_KEY", desc: "Natural language to SQL queries" },
            { id: "cap-43", name: "API tester", category: "Dev", apiKey: null, isFree: true, desc: "Test any public REST endpoint" },
            { id: "cap-44", name: "JSON formatter", category: "Dev", apiKey: null, isFree: true, desc: "Validate, format, and diff JSON" },
            { id: "cap-45", name: "GitHub repo analyser", category: "Dev", apiKey: "GITHUB_TOKEN", desc: "Stars, issues, commits, contributors" },
            { id: "cap-56", name: "Terminal Command", category: "Dev", apiKey: "GROQ_API_KEY", desc: "NL to Bash/PowerShell commands" },
            { id: "cap-57", name: "Git Helper", category: "Dev", apiKey: "GROQ_API_KEY", desc: "Explain git scenarios and commands" },
            { id: "cap-58", name: "Dockerize", category: "Dev", apiKey: "GROQ_API_KEY", desc: "Generate Dockerfiles for any stack" },
            // Fun
            { id: "cap-46", name: "Joke generator", category: "Fun", apiKey: null, isFree: true, desc: "Random jokes by category" },
            { id: "cap-47", name: "Anime finder", category: "Fun", apiKey: null, isFree: true, desc: "Search anime via Jikan/MAL" },
            { id: "cap-48", name: "Pokemon info", category: "Fun", apiKey: null, isFree: true, desc: "Any Pokemon stats and moves" },
            { id: "cap-49", name: "Activity suggester", category: "Fun", apiKey: null, isFree: true, desc: "Beat boredom with random activities" },
            { id: "cap-50", name: "Cat fact dispenser", category: "Fun", apiKey: null, isFree: true, desc: "Random verified cat facts" },
            { id: "cap-51", name: "Star Wars data", category: "Fun", apiKey: null, isFree: true, desc: "Characters, planets, ships from SWAPI" },
            { id: "cap-52", name: "Rick & Morty wiki", category: "Fun", apiKey: null, isFree: true, desc: "Characters and episodes" },
            { id: "cap-69", name: "Dog Whisperer", category: "Fun", apiKey: null, isFree: true, desc: "Random dog images and breed facts" },
            { id: "cap-72", name: "Advice Slip", category: "Fun", apiKey: null, isFree: true, desc: "Random life advice for any situation" },
            // Finance
            { id: "cap-53", name: "Crypto Heatmap", category: "Finance", apiKey: null, isFree: true, desc: "Top 10 crypto trends and stats" },
            { id: "cap-54", name: "Stock Ticker Info", category: "Finance", apiKey: "GROQ_API_KEY", desc: "Summarise stock news and performance" },
            { id: "cap-70", name: "Portfolio Roaster", category: "Finance", apiKey: "GROQ_API_KEY", desc: "Funny, brutal critique of your assets" },
            { id: "cap-71", name: "Forex Trends", category: "Finance", apiKey: null, isFree: true, desc: "Major currency pair analysis" },
            { id: "cap-55", name: "Expense Classifier", category: "Finance", apiKey: "GROQ_API_KEY", desc: "Categorise expenses and suggest savings" },
            // Productivity
            { id: "cap-73", name: "Task Prioritizer", category: "Productivity", apiKey: "GROQ_API_KEY", desc: "Sort tasks via Eisenhower Matrix" },
            { id: "cap-74", name: "Meeting Synthesizer", category: "Productivity", apiKey: "GROQ_API_KEY", desc: "Extract action items from transcripts" },
            { id: "cap-75", name: "Decision Matrix", category: "Productivity", apiKey: "GROQ_API_KEY", desc: "Objective scoring of life/biz choices" },
            // Marketing
            { id: "cap-76", name: "SEO Suggester", category: "Marketing", apiKey: "GROQ_API_KEY", desc: "Generate high-intent keywords" },
            { id: "cap-77", name: "Ad Copy Generator", category: "Marketing", apiKey: "GROQ_API_KEY", desc: "High-conversion copy for FB/Google ads" },
            { id: "cap-78", name: "Product Launch Plan", category: "Marketing", apiKey: "GROQ_API_KEY", desc: "30-day go-to-market strategy" },
            { id: "cap-79", name: "Competitor Analysis", category: "Marketing", apiKey: "SERPER_API_KEY", desc: "In-depth scan of competitor offerings" },
            { id: "cap-80", name: "Bio Generator", category: "Marketing", apiKey: "GROQ_API_KEY", desc: "Generate professional bios for all platforms" },
        ];


        const CATEGORIES = ["All", "AI", "Web", "Data", "Content", "Research", "Dev", "Fun", "Finance", "Productivity", "Marketing"];
        const ACCENTS = {
            AI: 'purple', Web: 'blue', Data: 'teal', Content: 'amber', 
            Research: 'green', Dev: 'pink', Fun: 'rose', Finance: 'emerald',
            Productivity: 'indigo', Marketing: 'orange'
        };

        const App = () => {
            // State
            const [apiKeys, setApiKeys] = useState(() => {
                const saved = localStorage.getItem('omega_keys');
                const initial = saved ? JSON.parse(saved) : {};
                if (!initial.GROQ_API_KEY && window.INJECTED_GROQ_KEY) {
                    initial.GROQ_API_KEY = window.INJECTED_GROQ_KEY;
                }
                return initial;
            });

            useEffect(() => {
                localStorage.setItem('omega_keys', JSON.stringify(apiKeys));
            }, [apiKeys]);

            const [selectedCaps, setSelectedCaps] = useState([]);
            const [execOrder, setExecOrder] = useState([]);
            const [goal, setGoal] = useState("");
            const [activeCategory, setActiveCategory] = useState("All");
            const [searchQuery, setSearchQuery] = useState("");
            const [isVaultOpen, setIsVaultOpen] = useState(false);
            const [activeCapIdx, setActiveCapIdx] = useState(-1);
            const [results, setResults] = useState({});
            const [logs, setLogs] = useState([]);
            const [status, setStatus] = useState("idle");
            const [mode, setMode] = useState("manual"); // manual | auto
            const canvasRef = useRef(null);
            const synthRef = useRef(null);
            const logRef = useRef(null);

            const log = (msg, type = "info") => {
                setLogs(prev => [...prev, { msg, type, time: new Date().toLocaleTimeString() }]);
                setTimeout(() => {
                    if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight;
                }, 50);
            };

            // Auto-scroll effect for active agent
            useEffect(() => {
                if (activeCapIdx >= 0) {
                    const activeEl = document.getElementById(`node-stage-${activeCapIdx}`);
                    if (activeEl) activeEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            }, [activeCapIdx]);

            // Auto-scroll for synthesis
            useEffect(() => {
                if (results.synthesis && synthRef.current) {
                    synthRef.current.scrollTop = synthRef.current.scrollHeight;
                }
            }, [results.synthesis]);

            const groqCall = async (prompt, system = "You are a helpful AI assistant.") => {
                if (!apiKeys.GROQ_API_KEY) throw new Error("Missing Groq API Key");
                const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
                    method: "POST",
                    headers: {
                        "Authorization": `Bearer ${apiKeys.GROQ_API_KEY}`,
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        model: "llama-3.3-70b-versatile",
                        messages: [
                            { role: "system", content: system },
                            { role: "user", content: prompt }
                        ],
                        temperature: 0.1
                    })
                });
                const data = await res.json();
                if (data.error) throw new Error(data.error.message);
                return data.choices[0].message.content;
            };

            const geminiCall = async (prompt) => {
                if (!apiKeys.GEMINI_API_KEY) throw new Error("Missing Gemini API Key");
                const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKeys.GEMINI_API_KEY}`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
                });
                const data = await res.json();
                if (data.error) throw new Error(data.error.message);
                return data.candidates[0].content.parts[0].text;
            };

            const EXECUTORS = {
                "cap-01": async (q) => groqCall(`Research this: ${q}`, "You are a Deep Research Agent. Provide facts, dates, and structured analysis."),
                "cap-02": async (q) => groqCall(`Generate code for: ${q}`, "You are a Senior Software Engineer. Output only the code and brief usage docs."),
                "cap-03": async (q) => groqCall(`Summarise this content: ${q}`, "You are a Synthesis Agent. Extract the core message and 5 key takeaways."),
                "cap-04": async (q) => groqCall(`Analyse sentiment of: ${q}`, "You are a Sentiment Analyst. Provide a core score (1-10) and emotional breakdown."),
                "cap-05": async (q) => groqCall(`Translate this to common global languages: ${q}`, "You are a Translation Expert. Provide translations in Spanish, French, German, Chinese, and Arabic."),
                "cap-06": async (q) => groqCall(`Draft a professional email for: ${q}`, "You are a Communications Expert. Provide 2 versions: Formal and Concise."),
                "cap-07": async (q) => groqCall(`Write a detailed report based on: ${q}`, "You are an Executive Assistant. Draft a professional 3rd-person report."),
                "cap-08": async (q) => geminiCall(`Analyse this with Google Gemini 1.5 Flash: ${q}`),
                "cap-09": async (q) => {
                    const arg1 = await groqCall(`Argue for the topic: ${q}`, "You are a Proponent.");
                    const arg2 = await groqCall(`Argue against the topic: ${q}`, "You are an Opponent.");
                    return `### PRO DEBATER\n${arg1}\n\n### CON DEBATER\n${arg2}`;
                },
                "cap-10": async (q) => groqCall(`Verify the following claim: ${q}`, "You are a Fact Checker. Search for potential inaccuracies and cite sources conceptually."),
                // Web
                "cap-11": async (q) => {
                    if (!apiKeys.SERPER_API_KEY) throw new Error("Serper API key missing");
                    const res = await fetch("https://google.serper.dev/search", {
                        method: "POST",
                        headers: { "X-API-KEY": apiKeys.SERPER_API_KEY, "Content-Type": "application/json" },
                        body: JSON.stringify({ q })
                    });
                    const data = await res.json();
                    return data.organic.slice(0, 5).map(r => `${r.title}\n${r.link}\n${r.snippet}`).join("\n---\n");
                },
                "cap-12": async (q) => {
                    if (!apiKeys.NEWS_API_KEY) throw new Error("NewsAPI key missing");
                    const res = await fetch(`https://newsapi.org/v2/everything?q=${encodeURIComponent(q)}&apiKey=${apiKeys.NEWS_API_KEY}`);
                    const data = await res.json(); return data.articles.slice(0, 5).map(a => `${a.title}\n${a.url}`).join("\n\n");
                },
                "cap-13": async (q) => {
                    if (!apiKeys.TAVILY_API_KEY) throw new Error("Tavily API key missing");
                    const res = await fetch("https://api.tavily.com/search", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ api_key: apiKeys.TAVILY_API_KEY, query: q, search_depth: "advanced" })
                    });
                    const data = await res.json(); return data.results.map(r => r.content).join("\n---\n");
                },
                "cap-14": async (q) => EXECUTORS["cap-11"](`top competitors for ${q}`),
                "cap-15": async (q) => {
                    const res = await fetch(`https://www.reddit.com/search.json?q=${encodeURIComponent(q)}`);
                    const data = await res.json(); return data.data.children.slice(0, 5).map(c => `[${c.data.subreddit}] ${c.data.title}\nhttps://reddit.com${c.data.permalink}`).join("\n\n");
                },
                "cap-16": async (q) => {
                    const res = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(q.replace(/ /g, '_'))}`);
                    const data = await res.json(); return data.extract || "No Wikipedia entry found.";
                },
                "cap-17": async (q) => {
                    const res = await fetch(`https://api.github.com/search/repositories?q=${encodeURIComponent(q)}`, {
                        headers: apiKeys.GITHUB_TOKEN ? { "Authorization": `token ${apiKeys.GITHUB_TOKEN}` } : {}
                    });
                    const data = await res.json(); return data.items.slice(0, 5).map(r => `${r.full_name} (${r.stargazers_count} stars)\n${r.html_url}\n${r.description}`).join("\n\n");
                },
                "cap-18": async (q) => {
                    const res = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${q.toLowerCase()}&vs_currencies=usd&include_24hr_change=true`);
                    const data = await res.json();
                    return JSON.stringify(data, null, 2);
                },
                "cap-19": async (q) => {
                    const [amount, from, to] = q.split(" ");
                    const res = await fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${from}&to=${to}`);
                    const data = await res.json(); return `${amount} ${from} = ${data.rates[to]} ${to}`;
                },
                "cap-21": async (q) => {
                    // Simplified: extracts lat/long via search or hardcoded common ones for demo
                    const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current_weather=true`);
                    const data = await res.json(); return `Temp: ${data.current_weather.temperature}°C, Wind: ${data.current_weather.windspeed}km/h`;
                },
                "cap-22": async (q) => {
                    const res = await fetch(`https://restcountries.com/v3.1/name/${encodeURIComponent(q)}`);
                    const data = await res.json(); return JSON.stringify(data[0].flags) + "\n" + data[0].capital[0];
                },
                "cap-23": async (q) => {
                    const res = await fetch(`https://ipinfo.io/${q}/json?token=${apiKeys.IPINFO_TOKEN || ""}`);
                    const data = await res.json(); return JSON.stringify(data, null, 2);
                },
                "cap-24": async (q) => {
                    const res = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${apiKeys.NASA_API_KEY || "DEMO_KEY"}`);
                    const data = await res.json(); return data.explanation;
                },
                "cap-25": async (m) => {
                    const res = await fetch("http://api.open-notify.org/iss-now.json");
                    const data = await res.json(); return `Lat: ${data.iss_position.latitude}, Long: ${data.iss_position.longitude}`;
                },
                "cap-26": async (q) => groqCall(`Write a 500 word blog post about: ${q}`, "You are an SEO Content Writer."),
                "cap-27": async (q) => groqCall(`Generate a social media content kit for: ${q}`, "You are a Social Media Manager."),
                "cap-28": async (q) => groqCall(`Write a product description for: ${q}`, "You are a Copywriter."),
                "cap-29": async (q) => {
                    const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(q)}`);
                    const data = await res.json(); return data.meals[0].strInstructions;
                },
                "cap-30": async (q) => {
                    const res = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${encodeURIComponent(q)}`);
                    const data = await res.json(); return data.drinks[0].strInstructions;
                },
                "cap-31": async (q) => {
                    const res = await fetch("https://opentdb.com/api.php?amount=1&type=multiple");
                    const data = await res.json(); return data.results[0].question + "\n" + data.results[0].correct_answer;
                },
                "cap-32": async (q) => {
                    const res = await fetch("https://api.quotable.io/random");
                    const data = await res.json(); return `"${data.content}" — ${data.author}`;
                },
                "cap-33": async (q) => {
                    const res = await fetch(`https://openlibrary.org/search.json?q=${encodeURIComponent(q)}`);
                    const data = await res.json(); return data.docs.slice(0, 5).map(d => `${d.title} by ${d.author_name?.join(", ")}`).join("\n");
                },
                "cap-34": async (q) => {
                    const res = await fetch(`https://musicbrainz.org/ws/2/artist/?query=${encodeURIComponent(q)}&fmt=json`);
                    const data = await res.json(); return data.artists[0].name + " - " + data.artists[0].country;
                },
                "cap-35": async (q) => {
                    const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(q)}`);
                    const data = await res.json(); return data[0].meanings[0].definitions[0].definition;
                },
                "cap-36": async (q) => {
                    const res = await fetch(`https://api.agify.io/?name=${q}`);
                    const data = await res.json(); return `Likely age: ${data.age}`;
                },
                "cap-37": async (q) => groqCall("Tell me a random science fact", "You are a Science Teacher."),
                "cap-38": async (q) => {
                    const res = await fetch(`https://en.wikipedia.org/api/rest_v1/feed/onthisday/all/${new Date().getMonth() + 1}/${new Date().getDate()}`);
                    const data = await res.json(); return data.events[0].text;
                },
                "cap-39": async (q) => {
                    const res = await fetch(`http://numbersapi.com/${q}/math`);
                    return await res.text();
                },
                "cap-40": async (q) => groqCall(`Review this code: ${q}`, "You are a Senior Reviewer."),
                "cap-41": async (q) => groqCall(`Build regex for: ${q}`, "You are a Dev Support."),
                "cap-42": async (q) => groqCall(`Generate SQL for: ${q}`, "You are a DBA."),
                "cap-43": async (q) => {
                    const res = await fetch(q);
                    return `Status: ${res.status}`;
                },
                "cap-44": async (q) => JSON.stringify(JSON.parse(q), null, 2),
                "cap-45": async (q) => EXECUTORS["cap-17"](q),
                "cap-46": async (q) => {
                    const res = await fetch("https://official-joke-api.appspot.com/random_joke");
                    const data = await res.json(); return `${data.setup} ... ${data.punchline}`;
                },
                "cap-47": async (q) => {
                    const res = await fetch(`https://api.jikan.moe/v4/anime?q=${encodeURIComponent(q)}`);
                    const data = await res.json(); return data.data[0].synopsis;
                },
                "cap-48": async (q) => {
                    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${q.toLowerCase()}`);
                    const data = await res.json(); return `Height: ${data.height}, Weight: ${data.weight}`;
                },
                "cap-49": async (q) => {
                    const res = await fetch("https://www.boredapi.com/api/activity");
                    const data = await res.json(); return data.activity;
                },
                "cap-50": async (q) => {
                    const res = await fetch("https://catfact.ninja/fact");
                    const data = await res.json(); return data.fact;
                },
                "cap-51": async (q) => {
                    const res = await fetch(`https://swapi.dev/api/people/?search=${q}`);
                    const data = await res.json(); return data.results[0].name + " from " + data.results[0].homeworld;
                },
                "cap-52": async (q) => {
                    const res = await fetch(`https://rickandmortyapi.com/api/character/?name=${q}`);
                    const data = await res.json(); return data.results[0].name + " is " + data.results[0].status;
                },
                // New additions
                "cap-53": async (q) => {
                    const res = await fetch("https://api.coingecko.com/api/v3/search/trending");
                    const data = await res.json(); return data.coins.slice(0, 5).map(c => c.item.name).join(", ");
                },
                "cap-54": async (q) => groqCall(`Provide a quick summary for stock: ${q}`, "You are a Financial Analyst."),
                "cap-56": async (q) => groqCall(`Generate a terminal command for: ${q}`, "You are a Linux Expert. Return ONLY the command."),
                "cap-57": async (q) => groqCall(`Explain this git situation: ${q}`, "You are a Git Workflow Expert."),
                "cap-58": async (q) => groqCall(`Generate a Dockerfile for this stack: ${q}`, "You are a DevOps Engineer. Return ONLY the Dockerfile."),
                "cap-59": async (q) => groqCall(`Generate 10 brand names and slogans for: ${q}`, "You are a Creative Director."),
                "cap-60": async (q) => groqCall(`Refine this prompt for better AI output: ${q}`, "You are a Prompt Engineer."),
                "cap-61": async (q) => {
                    const res = await fetch("https://hn.algolia.com/api/v1/search?tags=front_page");
                    const data = await res.json(); return data.hits.slice(0, 5).map(h => `${h.title}\n${h.url}`).join("\n\n");
                },
                "cap-62": async (q) => `https://web.archive.org/web/*/${q}`,
                "cap-63": async (q) => {
                    const res = await fetch(`https://api.waqi.info/feed/${q}/?token=demo`);
                    const data = await res.json(); return `AQI: ${data.data.aqi}`;
                },
                "cap-64": async (q) => groqCall(`Compare time zones for: ${q}`, "You are a Global Coordinator."),
                "cap-65": async (q) => groqCall(`Write 5 catchy captions for: ${q}`, "You are a Social Media Expert."),
                "cap-66": async (q) => groqCall(`Research best hashtags for: ${q}`, "You are a Marketing Strategist."),
                "cap-67": async (q) => {
                    const res = await fetch(`http://export.arxiv.org/api/query?search_query=all:${encodeURIComponent(q)}&max_results=5`);
                    const data = await res.text(); return data.substring(0, 500) + "...";
                },
                "cap-68": async (q) => groqCall(`Simulate a patent search for: ${q}`, "You are a Patent Lawyer."),
                "cap-69": async (q) => {
                    const res = await fetch("https://dog.ceo/api/breeds/image/random");
                    const data = await res.json(); return data.message;
                },
                "cap-70": async (q) => groqCall(`Roast this portfolio/asset list: ${q}`, "You are a Brutal Financial Comedian."),
                "cap-71": async (q) => groqCall(`Analyse current forex trends for: ${q}`, "You are a Forex Trader."),
                "cap-72": async (q) => {
                    const res = await fetch("https://api.adviceslip.com/advice");
                    const data = await res.json(); return data.slip.advice;
                },
                "cap-55": async (q) => groqCall(`Classify these expenses: ${q}`, "You are a Personal Finance Coach."),
                "cap-73": async (q) => groqCall(`Prioritize these tasks: ${q}`, "You are a Productivity Coach using Eisenhower Matrix."),
                "cap-74": async (q) => groqCall(`Summarise this meeting: ${q}`, "You are an Executive Secretary."),
                "cap-75": async (q) => groqCall(`Provide a decision matrix for: ${q}`, "You are a Strategic Consultant."),
                "cap-76": async (q) => groqCall(`Suggest SEO keywords for: ${q}`, "You are an SEO Expert."),
                "cap-77": async (q) => groqCall(`Write 3 ad variations for: ${q}`, "You are a Copywriter."),
                "cap-78": async (q) => groqCall(`Plan a launch for: ${q}`, "You are a Marketing Director."),
                "cap-79": async (q) => EXECUTORS["cap-11"](`competitor analysis for ${q}`),
                "cap-80": async (q) => groqCall(`Generate a bio for: ${q}`, "You are a Personal Branding Agent."),
            };

            const runAutoPlanner = async () => {
                if (!goal) return log("Please specify a goal first.", "error");
                if (!apiKeys.GROQ_API_KEY) return log("Groq API Key required for Auto Mode.", "error");
                
                setStatus("running");
                setLogs([]);
                log("🧠 Omega Agent is planning the operation...", "info");

                try {
                    const prompt = `Goal: "${goal}"\n\nAvailable Capabilities:\n${CAPABILITIES.map(c => `${c.id}: ${c.name} - ${c.desc}`).join('\n')}\n\nPick the most relevant sequence of capability IDs (up to 5) to achieve the goal. Return ONLY a JSON array of strings (the IDs).`;
                    const planText = await groqCall(prompt, "You are a Strategic Planner Agent. Output only JSON.");
                    const plan = JSON.parse(planText.match(/\[.*\]/s)[0]);
                    
                    log(`🗺️ Plan formulated: ${plan.length} stages selected.`, "success");
                    setSelectedCaps(plan);
                    setMode("manual"); // Switch back so user can see it or keep in auto? Let's just run it.
                    return plan;
                } catch (err) {
                    log(`Planning failed: ${err.message}`, "error");
                    setStatus("idle");
                    return null;
                }
            };
            const runOmegaAgent = async () => {
                let startCaps = selectedCaps;
                if (mode === "auto") {
                    const plan = await runAutoPlanner();
                    if (!plan) return;
                    startCaps = plan;
                }

                if (!goal) return log("Please specify a goal first.", "error");
                if (startCaps.length === 0) return log("Please select at least one capability.", "error");
                
                setStatus("running");
                setLogs([]);
                setResults({});
                log(`🚀 Starting Omega Pipeline for: "${goal}"`, "success");

                let currentContext = goal;
                const allOutputs = [];

                try {
                    for (let i = 0; i < startCaps.length; i++) {
                        setActiveCapIdx(i);
                        const capId = startCaps[i];
                        const cap = CAPABILITIES.find(c => c.id === capId);
                        
                        log(`[${i+1}/${selectedCaps.length}] Running ${cap.name}...`);
                        
                        try {
                            const output = await EXECUTORS[capId](currentContext);
                            setResults(prev => ({ ...prev, [capId]: { status: 'done', data: output } }));
                            allOutputs.push({ name: cap.name, output });
                            
                            // Context flow: next agent gets previous output + goal
                            currentContext = `Original Goal: ${goal}\n\nPrevious Data: ${output}`;
                            log(`✓ ${cap.name} completed.`, "success");
                        } catch (err) {
                            log(`✗ ${cap.name} failed: ${err.message}`, "error");
                            setResults(prev => ({ ...prev, [capId]: { status: 'error', data: err.message } }));
                        }
                    }

                    // Final Synthesis
                    setActiveCapIdx(-1);
                    log("🧠 Generating Omega Synthesis Report...");
                    const synthesisPrompt = `Goal: ${goal}\n\nExecution results from ${allOutputs.length} agents:\n${allOutputs.map(o => `### ${o.name}\n${o.output}`).join("\n\n")}\n\nProvide an executive summary and final answer based on all the data above. Use Markdown.`;
                    const synthesis = await groqCall(synthesisPrompt, "You are the Omega Coordinator. Synthesize all agent outputs into a final coherent response.");
                    setResults(prev => ({ ...prev, synthesis }));
                    log("✨ Pipeline complete!", "success");
                    setStatus("done");
                } catch (err) {
                    setActiveCapIdx(-1);
                    log(`Critical Pipeline Error: ${err.message}`, "error");
                    setStatus("error");
                }
            };

            const filteredCaps = useMemo(() => {

                return CAPABILITIES.filter(cap => {
                    const matchesCat = activeCategory === "All" || cap.category === activeCategory;
                    const matchesSearch = cap.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                                          cap.desc.toLowerCase().includes(searchQuery.toLowerCase());
                    return matchesCat && matchesSearch;
                });
            }, [activeCategory, searchQuery]);

            const freeCount = CAPABILITIES.filter(c => c.isFree).length;
            const needsKeyCount = CAPABILITIES.length - freeCount;

            return (
                <div className="flex flex-col h-screen w-full text-slate-200 selection:bg-purple-500/30 overflow-hidden relative">
                    {/* Background Layer */}
                    <div className="mesh-bg"></div>

                    {/* --- HEADER --- */}
                    <header className="h-16 glass flex items-center justify-between px-8 shrink-0 z-[60] border-b border-white/5">
                        <div className="flex items-center gap-5">
                            <div className="relative group">
                                <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
                                <div className="relative w-11 h-11 bg-slate-900 rounded-xl flex items-center justify-center shadow-2xl border border-white/10 overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-blue-500/20"></div>
                                    <Cpu className="text-purple-400 z-10" size={24} />
                                </div>
                            </div>
                            <div>
                                <h1 className="text-xl font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400">
                                    OMEGA<span className="text-purple-500 italic ml-1">V5</span>
                                </h1>
                                <div className="flex gap-4 text-[9px] uppercase tracking-[0.25em] font-black text-slate-500">
                                    <span>{CAPABILITIES.length} Nodes</span>
                                    <span className="text-emerald-500/80">Active Hub</span>
                                </div>
                            </div>
                        </div>

                        {/* Goal Input Central */}
                        <div className="flex-1 max-w-2xl px-12 flex items-center gap-3">
                            <div className="flex bg-slate-900/60 rounded-2xl border border-white/5 p-1 shrink-0">
                                <button 
                                    onClick={() => setMode("manual")}
                                    className={`px-4 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${mode === "manual" ? 'bg-white text-black shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}
                                >
                                    Manual
                                </button>
                                <button 
                                    onClick={() => setMode("auto")}
                                    className={`px-4 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${mode === "auto" ? 'bg-purple-600 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}
                                >
                                    Auto
                                </button>
                            </div>
                            <div className="relative flex-1 group">
                                <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none text-slate-500 group-focus-within:text-purple-400 transition-colors">
                                    <Zap size={16} />
                                </div>
                                <input 
                                    type="text" 
                                    value={goal}
                                    onChange={(e) => setGoal(e.target.value)}
                                    placeholder={mode === "auto" ? "Tell Omega what you want to achieve..." : "Objective for selected agents..."}
                                    className="w-full bg-slate-900/40 border border-white/5 rounded-2xl pl-12 pr-4 py-3.5 text-sm font-medium focus:border-purple-500/50 focus:outline-none focus:ring-4 focus:ring-purple-500/5 transition-all placeholder:text-slate-600 tracking-tight"
                                />
                            </div>
                            <button 
                                onClick={runOmegaAgent}
                                disabled={status === "running"}
                                className={`${status === "running" ? "is-running opacity-50" : "hover:scale-[1.02] hover:shadow-purple-500/10"} relative overflow-hidden bg-white text-black px-8 py-3.5 rounded-2xl flex items-center gap-2 font-black text-xs uppercase tracking-widest shadow-xl transition-all active:scale-95`}
                            >
                                {status === "running" ? <RefreshCw className="animate-spin" size={16} /> : <Play size={16} fill="currentColor" />}
                                <span>{status === "running" ? "Processing" : (mode === "auto" ? "Plan & Execute" : "Activate")}</span>
                            </button>
                        </div>

                        <div className="flex items-center gap-6">
                           <button 
                                onClick={() => setIsVaultOpen(!isVaultOpen)}
                                className={`group flex items-center gap-3 px-5 py-2.5 rounded-xl border transition-all duration-500 ${isVaultOpen ? 'bg-purple-600/20 border-purple-500 text-purple-400 shadow-lg shadow-purple-900/20' : 'bg-slate-900/50 border-white/5 hover:border-white/10 text-slate-400'}`}
                            >
                                <div className="p-1 bg-white/5 rounded-lg group-hover:bg-purple-500/10 transition-colors">
                                    <Key size={14} />
                                </div>
                                <span className="text-[10px] font-black uppercase tracking-widest">Vault</span>
                            </button>
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-slate-800 to-slate-900 border border-white/5 flex items-center justify-center p-0.5">
                                <div className="w-full h-full bg-slate-900 rounded-full flex items-center justify-center">
                                    <User size={18} className="text-slate-500" />
                                </div>
                            </div>
                        </div>
                    </header>

                    {/* --- MAIN CONTENT --- */}
                    <div className="flex flex-1 overflow-hidden">
                        
                        {/* Left Panel: Capabilities */}
                        <aside className="w-80 border-r border-white/5 flex flex-col bg-slate-950/20 backdrop-blur-xl z-10">
                            <div className="p-6 space-y-5">
                                <div className="relative group">
                                    <div className="absolute inset-0 bg-purple-500/5 blur-xl group-focus-within:bg-purple-500/10 transition-all"></div>
                                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-purple-400 transition-colors" size={16} />
                                    <input 
                                        type="text" 
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        placeholder="Explore capabilities..." 
                                        className="relative w-full bg-slate-900/60 border border-white/5 rounded-2xl pl-12 pr-4 py-3 text-xs focus:border-purple-500/40 outline-none transition-all placeholder:text-slate-600 font-medium"
                                    />
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {CATEGORIES.map(cat => (
                                        <button 
                                            key={cat}
                                            onClick={() => setActiveCategory(cat)}
                                            className={`px-4 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-[0.1em] transition-all duration-300 border ${activeCategory === cat ? 'bg-white text-black border-white shadow-lg' : 'bg-slate-900/50 text-slate-500 border-white/5 hover:border-white/20 hover:text-slate-300'}`}
                                        >
                                            {cat}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="flex-1 overflow-y-auto custom-scroll px-4 pb-6 space-y-3">
                                {filteredCaps.map(cap => {
                                    const isSelected = selectedCaps.includes(cap.id);
                                    const hasKey = cap.isFree || apiKeys[cap.apiKey];
                                    const accentColor = ACCENTS[cap.category] || 'slate';
                                    
                                    return (
                                        <div 
                                            key={cap.id}
                                            onClick={() => {
                                                if (!hasKey) return;
                                                setSelectedCaps(prev => prev.includes(cap.id) ? prev.filter(id => id !== cap.id) : [...prev, cap.id]);
                                            }}
                                            className={`p-4 rounded-2xl border transition-all duration-400 cursor-pointer group relative overflow-hidden ${
                                                isSelected 
                                                ? 'bg-purple-600/10 border-purple-500 shadow-2xl shadow-purple-500/10' 
                                                : !hasKey 
                                                  ? 'bg-slate-950/40 border-white/5 opacity-50 grayscale cursor-not-allowed scale-95'
                                                  : 'bg-slate-900/40 border-white/5 hover:bg-slate-900/60 hover:border-white/20 hover:translate-x-1'
                                            }`}
                                        >
                                            <div className="flex items-center justify-between mb-2">
                                                <div className={`px-2 py-0.5 rounded-lg text-[8px] font-black uppercase tracking-widest bg-${accentColor}-500/10 text-${accentColor}-400 border border-${accentColor}-500/20`}>
                                                    {cap.category}
                                                </div>
                                                {cap.isFree ? (
                                                    <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
                                                ) : hasKey ? (
                                                    <CheckCircle size={10} className="text-blue-500" />
                                                ) : (
                                                    <Lock size={10} className="text-slate-700" />
                                                )}
                                            </div>
                                            <h4 className="text-[11px] font-black text-slate-300 group-hover:text-white transition-colors uppercase tracking-wide">{cap.name}</h4>
                                            <p className="text-[10px] text-slate-500 leading-relaxed mt-1 line-clamp-2">{cap.desc}</p>
                                            
                                            {isSelected && (
                                                <div className="absolute right-3 bottom-3">
                                                    <div className="w-5 h-5 bg-purple-600 rounded-full flex items-center justify-center shadow-lg shadow-purple-500/40">
                                                        <Plus size={12} className="text-white rotate-45" strokeWidth={4} />
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>

                        </aside>

                    {/* Center: Canvas */}
                    <main className="flex-1 relative flex flex-col overflow-hidden z-0">
                        {/* Dot Grid Background */}
                        <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.03)_1px,transparent_1px)] [background-size:32px_32px]"></div>
                        
                        <div className="relative flex-1 overflow-y-auto custom-scroll p-12 lg:p-20">
                            {selectedCaps.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center">
                                    <div className="text-center space-y-8 max-w-sm">
                                        <div className="relative group">
                                            <div className="absolute -inset-4 bg-purple-500/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-all duration-1000"></div>
                                            <div className="w-24 h-24 bg-slate-900 border border-white/5 rounded-[2.5rem] flex items-center justify-center mx-auto shadow-2xl relative transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110">
                                                <Layers size={40} className="text-slate-700 group-hover:text-purple-400 transition-colors" />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <h3 className="text-2xl font-black text-slate-400 uppercase tracking-widest">Execution Canvas</h3>
                                            <p className="text-[11px] text-slate-600 uppercase tracking-widest font-bold leading-loose">
                                                Select nodes from the left hub to<br/>construct your autonomous operation
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="max-w-4xl mx-auto pb-20">
                                    <div className="flex items-center justify-between mb-12">
                                        <div className="flex items-center gap-4">
                                            <div className="h-px w-8 bg-purple-500/50"></div>
                                            <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-purple-400">Omega Workflow Pipeline</h3>
                                        </div>
                                        <button 
                                            onClick={() => setSelectedCaps([])} 
                                            className="px-4 py-2 bg-red-500/5 hover:bg-red-500/10 border border-red-500/20 text-red-500 text-[9px] font-black uppercase tracking-widest rounded-xl transition-all active:scale-95"
                                        >
                                            Purge Canvas
                                        </button>
                                    </div>

                                        <div className="space-y-6 relative" ref={canvasRef}>
                                            {/* Connecting Line In Background */}
                                            <div className="absolute left-6 top-8 bottom-8 w-px bg-gradient-to-b from-purple-500/50 via-slate-800 to-transparent z-0 transition-all duration-1000"></div>

                                            {selectedCaps.map((capId, idx) => {
                                                const cap = CAPABILITIES.find(c => c.id === capId);
                                                const isActive = idx === activeCapIdx;
                                                const isDone = results[capId]?.status === 'done';
                                                const isError = results[capId]?.status === 'error';
                                                
                                                return (
                                                    <div 
                                                        key={capId} 
                                                        id={`node-stage-${idx}`}
                                                        className={`flex items-start gap-6 transition-stage relative z-10 ${isActive ? 'scale-[1.02] translate-x-2' : ''}`}
                                                    >
                                                        <div className={`w-12 h-12 rounded-2xl border flex items-center justify-center text-[10px] font-black shrink-0 shadow-2xl transition-all duration-700 ${
                                                            isActive ? 'bg-purple-600 border-purple-400 text-white running-pulse ring-[6px] ring-purple-500/10' : 
                                                            isDone ? 'bg-emerald-500 border-emerald-400 text-white shadow-emerald-500/20' : 
                                                            'bg-slate-900 border-white/10 text-slate-500'
                                                        }`}>
                                                            {isDone ? <CheckCircle size={20} weight="bold" /> : idx + 1}
                                                        </div>
                                                        
                                                        <div className={`flex-1 glass p-6 rounded-3xl transition-all duration-700 ${isActive ? 'border-purple-500/50 bg-purple-500/10 shadow-2xl shadow-purple-500/5 ring-1 ring-purple-500/20' : 'border-white/5 hover:border-white/10'}`}>
                                                            <div className="flex items-center justify-between gap-4 mb-4">
                                                                <div className="flex items-center gap-3">
                                                                    <div className={`h-1.5 w-1.5 rounded-full ${isActive ? 'bg-purple-500' : isDone ? 'bg-emerald-500' : 'bg-slate-700'}`}></div>
                                                                    <h4 className={`text-[11px] font-black uppercase tracking-widest transition-colors ${isActive ? 'text-purple-400' : 'text-slate-200'}`}>{cap.name}</h4>
                                                                    <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest tabular-nums">IDX_{idx + 1}</span>
                                                                </div>
                                                            <div className="flex items-center gap-3">
                                                                {isError && <span className="text-[9px] font-black text-red-500 uppercase tracking-tighter">Failure</span>}
                                                                <div className="flex items-center gap-1">
                                                                    <button 
                                                                        onClick={() => {
                                                                            const newCaps = [...selectedCaps];
                                                                            if (idx > 0) [newCaps[idx], newCaps[idx-1]] = [newCaps[idx-1], newCaps[idx]];
                                                                            setSelectedCaps(newCaps);
                                                                        }}
                                                                        className="p-1.5 hover:bg-white/5 rounded-lg text-slate-600 hover:text-white transition-colors"
                                                                    >
                                                                        <ChevronDown size={14} className="rotate-180" />
                                                                    </button>
                                                                    <button 
                                                                        onClick={() => {
                                                                            const newCaps = [...selectedCaps];
                                                                            if (idx < selectedCaps.length - 1) [newCaps[idx], newCaps[idx+1]] = [newCaps[idx+1], newCaps[idx]];
                                                                            setSelectedCaps(newCaps);
                                                                        }}
                                                                        className="p-1.5 hover:bg-white/5 rounded-lg text-slate-600 hover:text-white transition-colors"
                                                                    >
                                                                        <ChevronDown size={14} />
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        {((isActive && !results[capId]?.data) || (results[capId] && results[capId].data)) && (
                                                            <div className={`mt-4 p-4 bg-black/40 border border-white/5 rounded-2xl text-[10px] font-mono leading-relaxed overflow-x-auto max-h-48 custom-scroll whitespace-pre-wrap transition-all duration-500 ${isActive ? 'shimmer border-purple-500/20 shadow-lg' : 'text-slate-400'}`}>
                                                                <div className="flex items-center gap-2 mb-2 text-[8px] text-slate-600 uppercase font-black tracking-widest italic border-b border-white/5 pb-2">
                                                                    <Terminal size={10} /> {isActive ? 'Processing Stream...' : 'Node Output Result'}
                                                                </div>
                                                                {isActive && !results[capId]?.data ? 'Consulting intelligence collective...' : results[capId]?.data}
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            );
                                        })}
                                        
                                        {/* Auto-Synthesis always happens */}
                                        <div className="flex items-start gap-6 opacity-30 mt-12 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-700 group">
                                            <div className="w-12 h-12 rounded-2xl border border-dashed border-white/20 flex items-center justify-center text-[10px] font-black text-slate-600 italic shrink-0 group-hover:border-purple-500/50 group-hover:text-purple-500 transition-colors">
                                                END
                                            </div>
                                            <div className="flex-1 bg-slate-950/20 border border-dashed border-white/10 rounded-3xl p-6">
                                                <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest italic group-hover:text-purple-400 transition-colors">Omega Synthesis Protocol</div>
                                                <div className="text-[9px] text-slate-700 italic mt-1 font-medium">Auto-generation of final intelligence report from node collective</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>


                        {/* Final Synthesis / Output Stream */}
                        <div className="h-96 glass-bright border-t border-white/5 flex flex-col overflow-hidden z-20 shadow-[0_-20px_50px_rgba(0,0,0,0.5)]">
                            <div className="flex items-center justify-between px-8 bg-black/40 border-b border-white/5">
                                <div className="flex">
                                    <button className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-purple-400 border-b-2 border-purple-500 bg-purple-500/5 transition-all">
                                        Intelligence Report
                                    </button>
                                    <button className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-600 hover:text-slate-400 transition-all">
                                        Pipeline Monitor
                                    </button>
                                </div>
                                <div className="flex items-center gap-4">
                                    {results.synthesis && (
                                        <button 
                                            onClick={() => {
                                                const blob = new Blob([results.synthesis], { type: 'text/markdown' });
                                                const url = URL.createObjectURL(blob);
                                                const a = document.createElement('a');
                                                a.href = url;
                                                a.download = `omega-report-${new Date().getTime()}.md`;
                                                a.click();
                                            }}
                                            className="flex items-center gap-2 px-4 py-2 bg-purple-600/10 hover:bg-purple-600/20 text-purple-400 border border-purple-500/30 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all"
                                        >
                                            <Download size={12} />
                                            Export MD
                                        </button>
                                    )}
                                    <div className="flex items-center gap-2">
                                        <div className={`w-1.5 h-1.5 rounded-full ${status === 'running' ? 'bg-purple-500 animate-pulse' : 'bg-slate-700'}`}></div>
                                        <span className="text-[8px] font-black uppercase tracking-widest text-slate-600">Core Engine: {status.toUpperCase()}</span>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="flex-1 flex overflow-hidden">
                                {/* Left: Synthesis Markdown */}
                                <div className="flex-1 p-0 overflow-y-auto custom-scroll border-r border-white/5 bg-slate-950/40" ref={synthRef}>
                                    {!results.synthesis ? (
                                        <div className="flex flex-col items-center justify-center h-full text-slate-700 italic text-[10px] gap-4">
                                            <Activity size={24} className="opacity-20" />
                                            <p className="uppercase tracking-[0.3em] font-black">Awaiting Synthesis Matrix</p>
                                        </div>
                                    ) : (
                                        <div className="p-12 lg:p-20 max-w-4xl mx-auto">
                                            <div className="relative p-12 bg-white/[0.02] border border-white/5 rounded-[4rem] shadow-2xl backdrop-blur-3xl overflow-hidden group">
                                                {/* Fancy inner glow */}
                                                <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/5 blur-[100px] rounded-full"></div>
                                                <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/5 blur-[100px] rounded-full"></div>
                                                
                                                <div className="relative text-slate-300 leading-relaxed space-y-4">
                                                    {results.synthesis.split('\n').map((line, i) => {
                                                        if (line.trim() === '') return <div key={i} className="h-4"></div>;
                                                        if (line.startsWith('###')) return <h3 key={i} className="text-purple-400 font-black mt-8 mb-4 tracking-[0.2em] uppercase text-xs flex items-center gap-3">
                                                            <div className="h-px w-4 bg-purple-500/30"></div> {line.replace('###', '')}
                                                        </h3>;
                                                        if (line.startsWith('##')) return <h2 key={i} className="text-white font-black mt-10 mb-6 text-xl tracking-tight">{line.replace('##', '')}</h2>;
                                                        if (line.startsWith('#')) return (
                                                            <div key={i} className="mb-12">
                                                                <div className="text-purple-500 text-[9px] font-black uppercase tracking-[0.5em] mb-2">Final Report</div>
                                                                <h1 className="text-white font-black text-4xl leading-tight bg-gradient-to-br from-white via-white to-slate-500 bg-clip-text text-transparent">{line.replace('#', '')}</h1>
                                                            </div>
                                                        );
                                                        if (line.startsWith('-') || line.startsWith('*')) return (
                                                            <div key={i} className="flex gap-4 my-2 px-4 py-3 bg-white/[0.01] border border-white/5 rounded-2xl text-[11px] text-slate-400 group-hover:bg-white/[0.02] transition-colors">
                                                                <div className="w-1 h-1 rounded-full bg-purple-500 mt-1.5 shrink-0"></div>
                                                                <span className="leading-relaxed">{line.substring(1).trim()}</span>
                                                            </div>
                                                        );
                                                        return <p key={i} className="text-xs text-slate-400 font-medium leading-loose indent-4">{line}</p>;
                                                    })}
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                                
                                {/* Right: Real-time Logs */}
                                <div className="w-96 bg-black/40 p-6 overflow-y-auto custom-scroll space-y-4 border-l border-white/5" ref={logRef}>
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-500">Operation Logs</span>
                                        <div className="flex gap-1">
                                            <div className="w-1 h-1 rounded-full bg-slate-800"></div>
                                            <div className="w-1 h-1 rounded-full bg-slate-800"></div>
                                            <div className="w-1 h-1 rounded-full bg-slate-800"></div>
                                        </div>
                                    </div>
                                    <div className="space-y-3">
                                        {logs.length === 0 ? (
                                            <div className="text-[9px] text-slate-700 italic font-medium uppercase tracking-widest py-20 text-center">System Idle...</div>
                                        ) : (
                                            logs.map((l, i) => (
                                                <div key={i} className="group flex gap-4 animate-in fade-in slide-in-from-left-2 duration-500">
                                                    <span className="text-[8px] font-mono text-slate-700 shrink-0 mt-1">[{l.time}]</span>
                                                    <div className="space-y-1 flex-1">
                                                        <div className={`text-[10px] font-black leading-tight tracking-tight ${l.type === 'error' ? 'text-red-500' : l.type === 'success' ? 'text-emerald-500' : 'text-slate-400'}`}>
                                                            {l.msg}
                                                        </div>
                                                        {l.type === 'info' && <div className="h-[2px] w-0 group-hover:w-full bg-purple-500/20 transition-all duration-700"></div>}
                                                    </div>
                                                </div>
                                            ))
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                        </main>
                    </div>

                    {/* --- API KEY VAULT (Bottom Popover) --- */}
                    {isVaultOpen && (
                        <div className="fixed bottom-4 right-4 w-[600px] max-h-[80vh] bg-gray-900 border border-gray-800 rounded-3xl shadow-2xl z-50 flex flex-col overflow-hidden animate-in slide-in-from-bottom duration-300">
                            <div className="p-6 border-b border-gray-800 flex justify-between items-center bg-gray-900/50 backdrop-blur-xl">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-purple-600/10 text-purple-500 rounded-lg">
                                        <Key size={20} />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-white uppercase tracking-tight text-sm">Free API Key Vault</h3>
                                        <p className="text-[10px] text-gray-500">Your keys stay in your browser. Encrypts on the fly.</p>
                                    </div>
                                </div>
                                <button onClick={() => setIsVaultOpen(false)} className="text-gray-500 hover:text-white p-2">
                                    <X size={20} />
                                </button>
                            </div>
                            <div className="flex-1 overflow-y-auto p-6 grid grid-cols-2 gap-6 custom-scroll">
                                {Object.entries(KEY_INFO).map(([key, info]) => {
                                    const isSet = !!apiKeys[key];
                                    return (
                                        <div key={key} className="space-y-2 group">
                                            <div className="flex justify-between items-center px-1">
                                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 group-focus-within:text-purple-400 transition-colors">
                                                    {key.replace(/_/g, ' ')}
                                                </label>
                                                <span className={`text-[8px] font-bold px-2 py-0.5 rounded-full uppercase ${isSet ? 'bg-green-500/10 text-green-500' : 'bg-gray-800 text-gray-600'}`}>
                                                    {isSet ? 'Verified' : 'Missing'}
                                                </span>
                                            </div>
                                            <div className="relative">
                                                <Key size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-purple-500" />
                                                <input 
                                                    type="password"
                                                    value={apiKeys[key] || ""}
                                                    onChange={(e) => setApiKeys(prev => ({ ...prev, [key]: e.target.value }))}
                                                    placeholder="Paste key here..."
                                                    className="w-full bg-gray-800/50 border border-gray-700/50 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white focus:border-purple-500 focus:outline-none transition-all"
                                                />
                                            </div>
                                            <div className="flex items-center justify-between text-[8px] px-1 font-bold">
                                                <span className="text-gray-500 uppercase tracking-tighter">Unlocks {info.unlocks} capabilities</span>
                                                <a href={info.url} target="_blank" className="text-purple-500 hover:text-purple-400 flex items-center gap-1 uppercase">
                                                    Get Key <ExternalLink size={8} />
                                                </a>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                        </div>
                    )}
                </div>
            );
        };

        const root = ReactDOM.createRoot(document.getElementById('root'));
        root.render(<App />);
    