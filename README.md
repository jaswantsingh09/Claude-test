# Modern Developer Portfolio

A stunning, animated developer portfolio built with HTML, CSS, and JavaScript. Features smooth animations, responsive design, and modern UI/UX principles.

## Features

### Animations
- **Fade-in animations** on page load
- **Typing effect** for job titles
- **Floating icons** with smooth motion
- **Scroll animations** for sections
- **Counter animations** for statistics
- **Progress bar animations** for skills
- **Hover effects** on cards and buttons
- **Parallax scrolling** effect
- **Cursor trail** effect (desktop only)
- **3D tilt effect** on project cards

### Sections
- **Hero Section**: Eye-catching landing with animated text and floating tech icons
- **About Section**: Personal introduction with animated statistics
- **Skills Section**: Technology stack with animated progress bars
- **Projects Section**: Portfolio showcase with hover effects
- **Contact Section**: Contact form and social media links

### Responsive Design
- Fully responsive layout
- Mobile-friendly navigation
- Optimized for all screen sizes
- Hamburger menu for mobile devices

### Interactive Features
- Smooth scrolling navigation
- Active navigation highlighting
- Mobile menu toggle
- Form validation and submission
- Scroll reveal animations
- Dynamic typing effect

## Technologies Used

- **HTML5**: Semantic markup
- **CSS3**: Modern styling with CSS Grid and Flexbox
- **JavaScript (ES6+)**: Interactive functionality
- **Font Awesome**: Icon library

## Setup Instructions

### Quick Start

1. Clone this repository:
   ```bash
   git clone https://github.com/yourusername/portfolio.git
   ```

2. Navigate to the project directory:
   ```bash
   cd portfolio
   ```

3. Open `index.html` in your browser:
   ```bash
   # On macOS
   open index.html

   # On Linux
   xdg-open index.html

   # On Windows
   start index.html
   ```

   Or simply double-click the `index.html` file.

### Using a Local Server (Recommended)

For the best experience, use a local development server:

#### Using Python
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

#### Using Node.js (http-server)
```bash
npx http-server
```

#### Using PHP
```bash
php -S localhost:8000
```

Then open your browser and navigate to `http://localhost:8000`

## Customization

### Personal Information

Edit the following files to customize the portfolio:

1. **index.html**: Update personal information, project details, and contact info
   - Line 22: Update name in the navigation logo
   - Lines 37-41: Update hero section with your name and title
   - Lines 73-89: Update about section text
   - Lines 119-155: Update skills and technologies
   - Lines 169-255: Update projects with your own work
   - Lines 267-285: Update contact information

2. **styles.css**: Customize colors and styling
   - Lines 10-18: Change color scheme in CSS variables
   ```css
   :root {
       --primary-color: #6366f1;  /* Change to your preferred color */
       --secondary-color: #8b5cf6;
       --accent-color: #ec4899;
   }
   ```

3. **script.js**: Modify interactive features
   - Lines 86-91: Update typing animation texts
   ```javascript
   const texts = [
       'Your Title 1',
       'Your Title 2',
       'Your Title 3'
   ];
   ```

### Adding Your Projects

Replace the placeholder projects with your own:

```html
<div class="project-card">
    <div class="project-image">
        <div class="project-overlay">
            <div class="project-links">
                <a href="your-demo-link" class="project-link">
                    <i class="fas fa-external-link-alt"></i>
                </a>
                <a href="your-github-link" class="project-link">
                    <i class="fab fa-github"></i>
                </a>
            </div>
        </div>
    </div>
    <div class="project-content">
        <h3>Your Project Name</h3>
        <p>Your project description</p>
        <div class="project-tags">
            <span class="tag">Tech 1</span>
            <span class="tag">Tech 2</span>
        </div>
    </div>
</div>
```

### Changing Colors

The portfolio uses CSS custom properties (variables) for easy color customization:

```css
:root {
    --primary-color: #6366f1;      /* Main brand color */
    --secondary-color: #8b5cf6;    /* Secondary accent */
    --accent-color: #ec4899;       /* Highlight color */
    --bg-dark: #0f172a;            /* Dark background */
    --bg-light: #1e293b;           /* Light background */
    --text-primary: #f1f5f9;       /* Primary text */
    --text-secondary: #cbd5e1;     /* Secondary text */
}
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Opera (latest)

## Performance Optimization

- Optimized animations using `transform` and `opacity`
- CSS Grid and Flexbox for efficient layouts
- Intersection Observer API for scroll animations
- RequestAnimationFrame for smooth animations
- Minimal dependencies (only Font Awesome for icons)

## Deployment

### GitHub Pages

1. Push your code to GitHub
2. Go to repository Settings
3. Navigate to Pages section
4. Select your branch and save
5. Your portfolio will be live at `https://yourusername.github.io/repository-name`

### Netlify

1. Push your code to GitHub
2. Go to [Netlify](https://netlify.com)
3. Click "New site from Git"
4. Select your repository
5. Click "Deploy site"

### Vercel

1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com)
3. Import your repository
4. Deploy with default settings

## License

This project is open source and available under the [MIT License](LICENSE).

## Credits

- Icons: [Font Awesome](https://fontawesome.com)
- Fonts: System fonts for optimal performance

## Contact

Feel free to reach out if you have any questions or suggestions!

- Email: your.email@example.com
- GitHub: [@yourusername](https://github.com/yourusername)
- LinkedIn: [Your Name](https://linkedin.com/in/yourprofile)

---

Made with ❤️ and code
