# Charan Koppuravuri - Portfolio

A modern, responsive portfolio website built with vanilla HTML, CSS, and JavaScript. Features a beautiful dark/light theme, subtle snow animation, and smooth scroll animations.

## 🌟 Features

- **Responsive Design** - Looks great on all devices
- **Dark/Light Theme** - Toggle with persistent preference
- **Snow Animation** - Subtle, performant canvas-based effect
- **Scroll Animations** - Elements reveal as you scroll
- **Timeline Experience** - Beautiful career timeline
- **Fast Loading** - No frameworks, pure vanilla code

## 🚀 Deploy to GitHub Pages

### Option 1: Quick Deploy (Recommended)

1. **Create a GitHub repository** named `charanpool.github.io`
   - Go to [github.com/new](https://github.com/new)
   - Repository name: `charanpool.github.io`
   - Make it **Public**
   - Click "Create repository"

2. **Push your code:**
   ```bash
   cd /Users/charank/Documents/2_Personal/portfolio
   git init
   git add .
   git commit -m "Initial portfolio commit"
   git branch -M main
   git remote add origin https://github.com/charanpool/charanpool.github.io.git
   git push -u origin main
   ```

3. **Enable GitHub Pages:**
   - Go to your repository → Settings → Pages
   - Source: Deploy from a branch
   - Branch: `main` → `/ (root)`
   - Click Save

4. **Your site will be live at:** `https://charanpool.github.io`

### Option 2: Using GitHub CLI

```bash
gh repo create charanpool.github.io --public --source=. --remote=origin --push
```

## 📁 Project Structure

```
portfolio/
├── index.html      # Main HTML file
├── styles.css      # All styles with CSS variables
├── script.js       # JavaScript functionality
└── README.md       # This file
```

## 🎨 Customization

### Update Your Information
Edit `index.html` to update:
- Personal details
- Work experience
- Skills
- Projects
- Contact information

### Change Colors
Edit CSS variables in `styles.css`:

```css
:root {
    --accent-primary: #f59e0b;    /* Main accent color */
    --accent-secondary: #fbbf24;  /* Secondary accent */
    --bg-primary: #0a0a0f;        /* Background color */
}
```

### Add Profile Photo
Replace the placeholder avatar in `index.html`:

```html
<!-- Find this section and replace with your image -->
<div class="placeholder-avatar">
    <img src="your-photo.jpg" alt="Charan Koppuravuri" style="width: 100%; height: 100%; object-fit: cover; border-radius: 50%;">
</div>
```

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📄 License

MIT License - Feel free to use this template for your own portfolio!

---

**Built with ❤️ by Charan Koppuravuri**

