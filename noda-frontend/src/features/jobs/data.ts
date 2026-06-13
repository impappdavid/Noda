// data.ts

export interface Job {
  id: number;
  type: "Full-time" | "Contract" | "Part-time";
  workMode: "Remote" | "Hybrid" | "Onsite";
  authorName: string;
  company: string;
  role: string;
  location: string;
  experience: string;
  status: "Live" | "Archived" | "Paused";
  match: number;
  salary: string;
  applied: boolean;
  description: string;
  postedAt?: string;
}

export const initialJobData: Job[] = [
  {
    id: 1,
    type: "Full-time",
    workMode: "Remote",
    authorName: "admin_alpha",
    company: "LINEAR LABS",
    role: "Senior Frontend Engineer",
    location: "San Francisco",
    experience: "5+ years",
    status: "Live",
    match: 96,
    salary: "$165k/yr",
    applied: true,
    postedAt: "2026-06-13T14:22:00.000Z",
    description: `## PHASE_01: SYSTEM_OVERVIEW
We are recruiting a **Senior Frontend Engineer** to spearhead the engineering of our high-throughput terminal interfaces. You will own the rendering efficiency of real-time telemetry dashboards and ensure zero-latency state sync.

### CORE_RESPONSIBILITIES:
* **Interface_Uplink**: Architecture and optimization of client-facing canvas components rendering millions of concurrent datapoints.
* **State_Deflection**: Implement localized cache hydration states to bypass standard network bottlenecks.
* **Brutalist_Design**: Collaborate with core designers to implement strict pixel-grid components with zero visual bloat.

---

## PHASE_02: REQUIRED_SPECIFICATIONS
* **Experience**: 5+ years building critical production web interfaces.
* **Tooling**: Deep mastery of React, TypeScript, and micro-frontend orchestrations.
* **Logic**: Ability to debug complex rendering bottlenecks using browser profiling suites.

---

## PHASE_03: UPLINK_BENEFITS
* **Tier_01_Access**: Premium medical, vision, and psychiatric health coverage nodes.
* **Hardware_Stipend**: $5,000 baseline setup credit for deep-work workstations.`
  },
  {
    id: 2,
    type: "Full-time",
    workMode: "Hybrid",
    authorName: "sys_op",
    company: "VERCEL",
    role: "Solutions Architect",
    location: "New York",
    experience: "3-5 years",
    status: "Live",
    match: 92,
    salary: "$140k/yr",
    postedAt: "2026-06-13T11:22:00.000Z",
    applied: false,
    description: `## PHASE_01: SYSTEM_OVERVIEW
Seeking a **Solutions Architect** to bridge the pipeline between global enterprise deployments and edge network runtimes. You will architect the failover strategies for hyper-scale consumer deployments.

### CORE_RESPONSIBILITIES:
* **Edge_Deployment**: Guide clients through complex routing implementations and ISR caching models.
* **Infrastructure_Audit**: Evaluate enterprise codebases for performance anti-patterns and network bottlenecks.
* **Telemetry_Sync**: Build and present functional proofs-of-concept parsing streaming edge telemetry.

---

## PHASE_02: REQUIRED_SPECIFICATIONS
* **Experience**: 3+ years in cloud infrastructure, developer relations, or technical architecture.
* **Tooling**: Comprehensive knowledge of Next.js, Edge compute engines, AWS infrastructure, and DNS routing.
* **Logic**: Expert-level system design articulation under high-stress evaluation windows.

---

## PHASE_03: UPLINK_BENEFITS
* **Equity_Stakes**: 0.08% startup equity node vesting monthly.
* **Travel_Uplink**: Fully covered international travel allowances for global developer conventions.`
  },
  {
    id: 3,
    type: "Contract",
    workMode: "Onsite",
    authorName: "ops_lead",
    company: "STRIPE",
    role: "Full Stack Engineer (Billing)",
    location: "Seattle",
    experience: "1-3 year",
    status: "Live",
    match: 88,
    salary: "$95/hr",
    postedAt: "2026-06-13T07:22:00.000Z",
    applied: true,
    description: `## PHASE_01: SYSTEM_OVERVIEW
Looking for a **Full Stack Specialist** to operate within the Ledger Integrity Unit. This position covers the deep algorithmic verification of multi-currency transactional routing paths.

### CORE_RESPONSIBILITIES:
* **Ledger_Verification**: Build robust double-entry accounting checking nodes into internal backend routines.
* **API_Hardening**: Refactor legacy payment pipelines to achieve 99.999% uptime during global traffic spikes.
* **Dashboard_Integration**: Maintain localized merchant metrics interfaces using highly responsive charts.

---

## PHASE_02: REQUIRED_SPECIFICATIONS
* **Experience**: 2+ years working inside financial technology or distributed systems.
* **Tooling**: Proficient with Ruby on Rails, Go, React, and strict SQL schema mutations.
* **Compliance**: Strict adherence to PCI-DSS security frameworks and internal ledger audits.

---

## PHASE_03: UPLINK_BENEFITS
* **Hourly_Premium**: High-yield contract rates with overtime multipliers.
* **Onsite_Perks**: Access to corporate culinary arrays and health tracking facilities.`
  },
  {
    id: 4,
    type: "Full-time",
    workMode: "Remote",
    authorName: "db_master",
    company: "SUPABASE",
    role: "Database Engineer",
    location: "Austin",
    experience: "5+ years",
    status: "Live",
    match: 94,
    salary: "$180k/yr",
    postedAt: "2026-06-13T07:22:00.000Z",
    applied: false,
    description: `## PHASE_01: SYSTEM_OVERVIEW
We require a **Database Kernel Specialist** to push the structural limits of relational open-source engines. You will optimize extensions and handle automated orchestration layer engineering.

### CORE_RESPONSIBILITIES:
* **Extension_Forging**: Build and maintain safe C/Rust extensions for deep cloud-native automation layers.
* **Query_Optimization**: Diagnostics of slow-running query logs across clustered execution environments.
* **Open_Source**: Contribute fixes directly upstream to core infrastructure projects.

---

## PHASE_02: REQUIRED_SPECIFICATIONS
* **Experience**: 5+ years working explicitly with PostgreSQL internals or systems database engineering.
* **Tooling**: Mastery of C, Rust, PostgreSQL internals, and Linux container runtimes.
* **Paradigm**: Deep understanding of replication algorithms, logical decoding, and connection pooling logic.

---

## PHASE_03: UPLINK_BENEFITS
* **Remote_Autonomy**: 100% remote asynchronous deployment model across any time zone.
* **Open_Source_Bounty**: Additional performance bonuses scaled to community code merges.`
  },
  {
    id: 5,
    type: "Full-time",
    workMode: "Remote",
    authorName: "comms_01",
    company: "RESEND",
    role: "Product Engineer",
    location: "Miami",
    experience: "1-3 year",
    status: "Live",
    match: 85,
    salary: "$120k/yr",
    postedAt: "2026-06-12T18:22:00.000Z",
    applied: false,
    description: `## PHASE_01: SYSTEM_OVERVIEW
Seeking a **Product Engineer** obsessed with exceptional visual execution. You will shape the direct interactive experience of our mail transaction delivery mechanisms.

### CORE_RESPONSIBILITIES:
* **UX_Refinement**: Turn intricate API configurations into ultra-clean web dashboards.
* **Component_Isolation**: Maintain a pristine library of atomic utility visual elements.
* **SDK_Alignment**: Design straightforward data inputs that feel natural to modern application developers.

---

## PHASE_02: REQUIRED_SPECIFICATIONS
* **Experience**: 2+ years operating within product-led SaaS startups.
* **Tooling**: Advanced competency in Next.js, Tailwind CSS, Framer Motion, and Node.js.
* **Design_Eye**: High spatial awareness regarding layout layout balance and type scale layouts.

---

## PHASE_03: UPLINK_BENEFITS
* **Workspace_Allocation**: Complete home-office design coverage package.
* **Health_Nodes**: Comprehensive wellness stipends and physical training membership cards.`
  },
  {
    id: 6,
    type: "Full-time",
    workMode: "Hybrid",
    authorName: "vector_x",
    company: "FIGMA",
    role: "Systems Engineer (WASM)",
    location: "London",
    experience: "5+ years",
    status: "Live",
    match: 79,
    salary: "£135k/yr",
    postedAt: "2026-06-12T10:00:00.000Z",
    applied: false,
    description: `## PHASE_01: SYSTEM_OVERVIEW
Join our Core Engine Group as a **WASM Systems Specialist**. Your layout scope will center on optimizing layout calculations inside browser sandboxes.

### CORE_RESPONSIBILITIES:
* **Memory_Management**: Implement custom linear memory allocators to prevent client application crashes.
* **Vector_Acceleration**: Speed up multi-threaded rendering processes using low-level browser abstractions.
* **Cross_Compilation**: Compile high-performance desktop graphics stacks safely into WebAssembly modules.

---

## PHASE_02: REQUIRED_SPECIFICATIONS
* **Experience**: 5+ years handling bare-metal resource constraints or graphics frameworks.
* **Tooling**: Advanced C++, Rust, WebAssembly tooling, and WebGL/WebGPU API interfaces.
* **Math_Logic**: Flawless manipulation of matrix transformations and coordinate-space algorithms.

---

## PHASE_03: UPLINK_BENEFITS
* **Learning_Budgets**: Unlimited coverage for technical books, research papers, and hardware sandboxes.
* **Hybrid_Flex**: 2 days onsite in our high-density collaboration nodes, 3 days remote.`
  },
  {
    id: 7,
    type: "Full-time",
    workMode: "Onsite",
    authorName: "design_system",
    company: "CHRONICLE",
    role: "Junior UI Developer",
    location: "Paris",
    experience: "1-3 year",
    status: "Live",
    match: 91,
    salary: "€55k/yr",
    postedAt: "2026-06-11T09:15:00.000Z",
    applied: true,
    description: `## PHASE_01: SYSTEM_OVERVIEW
Looking for an enthusiastic **Junior UI Developer** to construct clean typography layouts and dynamic presentation components for our rich interactive storytelling terminal.

### CORE_RESPONSIBILITIES:
* **Layout_Assembly**: Implement exact interactive presentation grids following Figma specifications.
* **Animation_Choreography**: Build beautiful transition states and layout reveals that maintain a consistent frame rate.
* **Cross_Browser_Hardening**: Fix minor CSS layout discrepancies across mobile and desktop web targets.

---

## PHASE_02: REQUIRED_SPECIFICATIONS
* **Experience**: 1+ years building client interfaces with clean, standard code.
* **Tooling**: Solid familiarity with modern React, Tailwind CSS, and vanilla DOM scripting.
* **Detail_Focus**: Sharp eye for micro-interactions, padding consistency, and color accuracy.

---

## PHASE_03: UPLINK_BENEFITS
* **Mentorship_Uplink**: Paired directly with a Senior Core Architecture Engineer for career track acceleration.
* **Transit_Pass**: Fully subsidized local transport and commuter passes.`
  },
  {
    id: 8,
    type: "Contract",
    workMode: "Remote",
    authorName: "ray_mgr",
    company: "RAYCAST",
    role: "macOS Engineer (Swift)",
    location: "Berlin",
    experience: "3-5 years",
    status: "Live",
    match: 74,
    salary: "€85/hr",
    postedAt: "2026-06-10T14:45:00.000Z",
    applied: false,
    description: `## PHASE_01: SYSTEM_OVERVIEW
We are opening a pipeline for a **Native macOS Engineer** to scale extension access speeds. You will optimize the execution architecture of background extension runtime engines.

### CORE_RESPONSIBILITIES:
* **App_Performance**: Profile memory allocations and cold-boot times to keep interface rendering instant.
* **System_Integration**: Connect deep macOS accessibility APIs with input parsing subsystems.
* **IPC_Refactoring**: Rewrite local messaging channels for lightning-fast cross-process performance.

---

## PHASE_02: REQUIRED_SPECIFICATIONS
* **Experience**: 4+ years building high-quality native applications for Apple platforms.
* **Tooling**: Deep expertise in Swift, AppKit/SwiftUI, Combine, and low-level Instruments tracking.
* **API_Design**: Prover history of building clean, logical APIs for developer ecosystems.

---

## PHASE_03: UPLINK_BENEFITS
* **Hardware_Kit**: Shipped top-tier Apple Silicon laptop and ultra-wide display nodes.
* **Flexible_Timeline**: Asynchronous scheduling with minimal structural meeting overhead.`
  },
  {
    id: 9,
    type: "Full-time",
    workMode: "Remote",
    authorName: "infra_god",
    company: "RAILWAY",
    role: "DevOps Infrastructure Lead",
    location: "Los Angeles",
    experience: "5+ years",
    status: "Live",
    match: 97,
    salary: "$195k/yr",
    postedAt: "2026-06-09T08:30:00.000Z",
    applied: false,
    description: `## PHASE_01: SYSTEM_OVERVIEW
We are hiring an **Infrastructure Operations Lead** to oversee multi-region orchestration deployments. You will design automated networking systems capable of handling billions of incoming requests.

### CORE_RESPONSIBILITIES:
* **Cluster_Orchestration**: Manage multi-tenant Kubernetes environments across varied bare-metal cloud networks.
* **Network_Hardening**: Build and scale multi-region mesh routing layers to ensure reliable failover paths.
* **Incident_Response**: Mitigate unexpected upstream resource outages and improve overall system recovery speeds.

---

## PHASE_02: REQUIRED_SPECIFICATIONS
* **Experience**: 6+ years running high-availability distributed operations infrastructure.
* **Tooling**: Expert command over Go, Docker, Kubernetes, eBPF, and automated routing mechanics.
* **Security**: Practical understanding of modern kernel hardening patterns and network isolations.

---

## PHASE_03: UPLINK_BENEFITS
* **On_Call_Premiums**: Extra compensation allocations during active rotation sequences.
* **Unlimited_Rest**: Trust-based paid time off policy with a mandatory 4-week annual floor.`
  },
  {
    id: 10,
    type: "Full-time",
    workMode: "Hybrid",
    authorName: "auth_sec",
    company: "CLERK",
    role: "Developer Relations Engineer",
    location: "Boston",
    experience: "3-5 years",
    status: "Live",
    match: 86,
    salary: "$135k/yr",
    postedAt: "2026-06-07T16:00:00.000Z",
    applied: true,
    description: `## PHASE_01: SYSTEM_OVERVIEW
Seeking a **Technical Relations Engineer** with an engineering background to construct real-world reference apps and write accessible tutorials on advanced authorization frameworks.

### CORE_RESPONSIBILITIES:
* **Reference_Engineering**: Build comprehensive open-source boilerplate projects showcasing complex multi-tenant workflows.
* **Technical_Writing**: Author deep-dive documentation breaking down intricate protocol specifications.
* **Community_Triage**: Assist external engineers with implementation edge-cases across discord and forum outposts.

---

## PHASE_02: REQUIRED_SPECIFICATIONS
* **Experience**: 3+ years engineering products alongside historical technical advocacy work.
* **Tooling**: Deep knowledge of modern web development stacks (Next.js, Remix, Vue, Node.js).
* **Protocol_Knowledge**: Comprehensive understanding of OAuth2, OIDC, WebAuthn, and JWT security.

---

## PHASE_03: UPLINK_BENEFITS
* **Travel_Budget**: Fully financed international allowances for regional conferences.
* **Content_Gear**: High-quality video, mic, and media production setup provided.`
  },
  {
    id: 11,
    type: "Part-time",
    workMode: "Onsite",
    authorName: "intern_coord",
    company: "CAMPBELL CO",
    role: "Frontend Support Intern",
    location: "Chicago",
    experience: "Junior",
    status: "Live",
    match: 68,
    salary: "$30/hr",
    postedAt: "2026-06-06T11:00:00.000Z",
    applied: false,
    description: `## PHASE_01: SYSTEM_OVERVIEW
We are opening an entry-level **Frontend Support Position** to assist with updating internal administration dashboards and resolving ticket backlog items.

### CORE_RESPONSIBILITIES:
* **Dashboard_Maintenance**: Update basic data layouts and static informational tables.
* **Bug_Correction**: Fix straightforward layout and input validation bugs submitted by internal staff.
* **Documentation_Logs**: Help keep markdown component libraries up to date.

---

## PHASE_02: REQUIRED_SPECIFICATIONS
* **Experience**: Foundational knowledge of frontend mechanics via self-study or coursework.
* **Tooling**: Working knowledge of HTML, CSS, JavaScript, and standard Git commands.
* **Communication**: Clear written communication for logging bug resolutions.

---

## PHASE_03: UPLINK_BENEFITS
* **Academic_Credits**: Validated structural internship documentation for university degrees.
* **Flexible_Hours**: Part-time scheduling built around your class timetable.`
  },
  {
    id: 12,
    type: "Full-time",
    workMode: "Remote",
    authorName: "peer_2_peer",
    company: "CAL.COM",
    role: "Core Maintainer",
    location: "Remote",
    experience: "3-5 years",
    status: "Live",
    match: 93,
    salary: "$150k/yr",
    postedAt: "2026-06-03T09:00:00.000Z",
    applied: false,
    description: `## PHASE_01: SYSTEM_OVERVIEW
We are hiring a dedicated **Core Platform Maintainer** to optimize our distributed scheduling coordination layers and calendar api engines.

### CORE_RESPONSIBILITIES:
* **Engine_Optimization**: Improve timezone and calculation performance across complex availability matrices.
* **API_Versioning**: Design backwards-compatible database schemas for enterprise users.
* **PR_Orchestration**: Review, optimize, and safely merge community open-source pull requests.

---

## PHASE_02: REQUIRED_SPECIFICATIONS
* **Experience**: 4+ years engineering complex SaaS products or managing visible open-source codebases.
* **Tooling**: Expert knowledge of TypeScript, Prisma ORM, Next.js, and Postgres databases.
* **Logic**: Fluent dealing with time boundary anomalies, complex date logic, and high-concurrency race conditions.

---

## PHASE_03: UPLINK_BENEFITS
* **Global_Flexibility**: Work from anywhere in the world with fully asynchronous operational pipelines.
* **Hardware_Refresh**: New hardware refresh node allocation every 24 months.`
  },
  {
    id: 13,
    type: "Contract",
    workMode: "Remote",
    authorName: "dx_lead",
    company: "TURBOREPO",
    role: "Build Tools Engineer",
    location: "Remote",
    experience: "5+ years",
    status: "Live",
    match: 89,
    salary: "$110/hr",
    postedAt: "2026-05-30T13:00:00.000Z",
    applied: true,
    description: `## PHASE_01: SYSTEM_OVERVIEW
Seeking a **Build Tools System Engineer** for a specialized contract to optimize internal monorepo graph computation speeds.

### CORE_RESPONSIBILITIES:
* **Graph_Optimization**: Refactor dependency resolution loops to maximize local compilation speeds.
* **Cache_Refinement**: Build secure distributed hashing checks for remote compiler outputs.
* **Telemetry_Tracking**: Construct clear terminal output formatting tools for developer builds.

---

## PHASE_02: REQUIRED_SPECIFICATIONS
* **Experience**: 5+ years building developer tools, compilers, or advanced build systems.
* **Tooling**: Deep mastery of Rust, Go, and low-level build systems architecture.
* **Logic**: Advanced knowledge of directed acyclic graph data structures and task scheduling.

---

## PHASE_03: UPLINK_BENEFITS
* **High_Yield**: Premium contract compensation structure.
* **Direct_Impact**: Shape toolchains used by hundreds of thousands of developers globally.`
  },
  {
    id: 14,
    type: "Full-time",
    workMode: "Hybrid",
    authorName: "telemetry_core",
    company: "SENTRY",
    role: "SDK Engineer (Rust/Node)",
    location: "Toronto",
    experience: "3-5 years",
    status: "Live",
    match: 82,
    salary: "$145k/yr",
    postedAt: "2026-05-19T07:45:00.000Z",
    applied: false,
    description: `## PHASE_01: SYSTEM_OVERVIEW
We need a focused **SDK Systems Engineer** to build zero-overhead profiling instrumentation packages for modern application runtimes.

### CORE_RESPONSIBILITIES:
* **Instrumentation**: Write low-overhead tracking code hooks that parse runtime errors without impacting app performance.
* **Context_Inference**: Extract stack trace records and local variables safely from running threads.
* **Payload_Minimization**: Compression of diagnostic data packets sent over network connections.

---

## PHASE_02: REQUIRED_SPECIFICATIONS
* **Experience**: 3+ years in systems engineering or developing developer tools libraries.
* **Tooling**: Advanced competency in Rust, Node.js internals, WebAssembly, and compiler layouts.
* **Precision**: Passion for micro-optimizations and minimizing CPU and memory footprints.

---

## PHASE_03: UPLINK_BENEFITS
* **Wellness_Stipend**: Comprehensive wellness support funds.
* **Office_Hub**: Dedicated private workspaces within our design-focused collaborative space.`
  },
  {
    id: 15,
    type: "Full-time",
    workMode: "Onsite",
    authorName: "ai_compute",
    company: "MODAL LABS",
    role: "AI Infrastructure Engineer",
    location: "Seattle",
    experience: "5+ years",
    status: "Live",
    match: 95,
    salary: "$210k/yr",
    postedAt: "2026-05-19T07:45:00.000Z",
    applied: false,
    description: `## PHASE_01: SYSTEM_OVERVIEW
Looking for an **AI Infrastructure Specialist** to design container isolation runtimes that boot in under 50ms on remote GPU clusters.

### CORE_RESPONSIBILITIES:
* **Runtime_Architecture**: Optimize custom Linux container images for instantaneous cold-boot operations.
* **GPU_Slicing**: Build reliable resource allocators for shared Nvidia hardware blocks.
* **Storage_Streaming**: Build fast file streaming protocols to load AI weights on demand.

---

## PHASE_02: REQUIRED_SPECIFICATIONS
* **Experience**: 5+ years in low-level systems programming or distributed cloud operations.
* **Tooling**: Mastery of Rust, C, Linux kernel plumbing, eBPF, and CUDA environments.
* **Logic**: Deep familiarity with file system architectures and high-throughput virtual networking.

---

## PHASE_03: UPLINK_BENEFITS
* **Compute_Access**: Large personal sandbox credits for private AI research.
* **Top_Tier_Equity**: Exceptional early-stage equity allocations.`
  }
];