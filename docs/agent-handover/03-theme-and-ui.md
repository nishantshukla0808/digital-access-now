# Digital Access Now (DAN) - Theme & UI Guidelines

## Global Theme Policy
The core aesthetic principle is a **clean, modern, highly-professional UI** that strictly utilizes the primary blue brand color while avoiding generic templates or unnecessary clutter. 

### Color Palette
- **Primary Brand Color**: `primary-blue` (`#00BCD4`). This is a vibrant cyan utilized for buttons, active states, active navigation tabs, and primary emphasis.
- **Secondary Accent**: `primary-purple` (`#6633CC`). *WARNING*: Purple has been largely stripped from the portal's components (Auth pages, Dashboards) to enforce a uniform blue standard. Purple is ONLY permitted as a subtle gradient accent (`bg-gradient-to-r from-primary-blue to-primary-purple`) but NEVER as a standalone primary action button.
- **Background Details**: The portal background uses a linear gradient (`bg-[linear-gradient(180deg,#f0f9ff_0%,#e8f4fd_100%)]`).

### UI Component Rules
- **Logo Configuration**: The primary brand logo is pulled dynamically from `https://i.ibb.co/F4fp0JSL/logo-DAN-removebg-preview-Picsart-Ai-Image-Enhancer.png`. It must always use `max-w-[200px] h-auto object-contain` (or `max-w-[140px]` on sidebars) to prevent the aspect ratio from stretching. Do NOT force strict `size-12` heights.
- **Typography & Layout**: We use single-column layouts for maximum responsiveness, avoiding side-by-side "tips" cards on Auth pages to maintain visual professionalism.
- **No Placeholders**: Do not include "Demo", "Mockup", or "UI Prototype" watermark texts. The codebase should read and operate like a production-ready system.
