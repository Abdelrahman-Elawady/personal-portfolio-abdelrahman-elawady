# Portfolio Website - Enhanced Version
# This is the second update to my website after its first hosting

## 🎨 New Features

### 1. **Light/Dark Mode Toggle**
- Added a theme toggle button in the navigation bar
- Dark mode is set as default
- User preference is saved in localStorage
- Smooth transition between themes
- All colors dynamically adjust based on theme

### 2. **Reveal on Scroll Animation**
- Sections fade in and slide up as you scroll
- Smooth, professional animation effect
- Adds elegance to the browsing experience

### 3. **Typing Text Effect**
- About Me section paragraphs have a typewriter effect
- Text appears character by character when scrolled into view
- Cursor blink animation for authentic typing feel

### 4. **Dynamic Data Loading**
- Work items (experience, publications, projects) are now loaded from `data.json`
- Easy to update - just edit the JSON file
- Automatically creates cards with proper formatting
- Separates work into three distinct sections

### 5. **Refined Design**
- Improved color scheme for dark theme elegance
- Better spacing and dimensions
- Enhanced card design with hover effects
- Smoother animations and transitions
- Active navigation highlighting

### 6. **Separate Work Sections**
- **Experience**: Professional work history
- **Publications**: Research papers and academic work
- **Projects**: Personal and professional projects
- Each section has its own slider with navigation

## 📁 File Structure

```
portfolio/
├── index.html          # Main HTML file
├── styles.css          # Enhanced CSS with theme support
├── scripts.js          # JavaScript with all new features
├── data.json          # Work data (experience, publications, projects)
└── images/            # All images folder
```

## 🚀 How to Use

### 1. **Basic Setup**
Simply open `index.html` in a web browser. All features work out of the box!

### 2. **Adding/Editing Work Items**

Edit the `data.json` file to add or modify your work items:

```json
{
  "experience": [
    {
      "image": "images/your-image.jpg",
      "title": "Your Job Title",
      "subtitle": "Company Name",
      "description": "Full description of your work...",
      "date": "2024-06",
      "link": "https://your-link.com"
    }
  ],
  "publications": [...],
  "projects": [...]
}
```

**Date Format**: Use `YYYY-MM` format (e.g., "2024-06" for June 2024)

### 3. **Customizing Colors**

Colors are defined as CSS variables in `styles.css`. You can customize them:

```css
:root {
  /* Light mode colors */
  --accent-primary: #4161b8;
  --accent-secondary: #5b7fcf;
  /* ... more colors */
}

.dark-mode {
  /* Dark mode colors */
  --accent-primary: #6b7fd7;
  --accent-secondary: #8a9ce6;
  /* ... more colors */
}
```

### 4. **Adding More Skills**

Edit the skills section in `index.html`:

```html
<div class="wrapper">
  <div class="itemLeft item1">Your Skill</div>
  <div class="itemLeft item2">Another Skill</div>
  <!-- Add more items (up to item8) -->
</div>
```

## 🎯 Key Features Explained

### Theme Toggle
- Click the sun/moon icon in the navigation
- Preference persists across sessions
- Instant theme switching

### Typing Effect
- Activates when scrolling to About Me section
- Each paragraph types independently
- Cursor disappears after typing completes

### Card System
- Automatically wraps text to fit card
- Shows date in "Month Year" format
- Expandable description (shows first 5 lines)
- "View More" button links to full content

### Responsive Design
- Mobile-friendly navigation
- Cards adapt to screen size
- Hidden elements on smaller screens
- Touch-friendly interactions

## 🔧 Customization Tips

### Change Animation Speed
In `scripts.js`, modify the typing speed:
```javascript
typeText(entry.target, text, 20); // Change 20 to desired speed (ms)
```

### Adjust Reveal Animation
In `styles.css`:
```css
.reveal {
  opacity: 0;
  transform: translateY(50px); /* Adjust distance */
}
```

### Modify Card Layout
In `scripts.js`, change Swiper breakpoints:
```javascript
breakpoints: {
  0: { slidesPerView: 1 },
  520: { slidesPerView: 2 },
  950: { slidesPerView: 3 }
}
```

## 📱 Browser Compatibility

- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Mobile browsers

## 🎨 Design Philosophy

The enhanced design focuses on:
- **Elegance**: Clean, professional appearance
- **Readability**: Proper contrast and spacing
- **Performance**: Smooth animations, optimized loading
- **Accessibility**: Semantic HTML, ARIA labels
- **Maintainability**: Separated concerns, clean code

## 📝 Notes

1. **Images**: Make sure all image paths in `data.json` are correct
2. **Dates**: Use ISO format (YYYY-MM) for proper sorting
3. **Links**: Always include `https://` in URLs
4. **Text Length**: Keep descriptions concise for better card appearance
5. **Backup**: Always backup `data.json` before making changes

## 🚨 Troubleshooting

**Cards not appearing?**
- Check `data.json` syntax (use a JSON validator)
- Ensure image paths are correct
- Check browser console for errors

**Theme not switching?**
- Clear browser cache
- Check if localStorage is enabled
- Verify JavaScript is enabled

**Animations not working?**
- Ensure scripts.js is loaded
- Check for JavaScript errors in console
- Try hard refresh (Ctrl+F5)

## 💡 Future Enhancements

Consider adding:
- Filter/search functionality for projects
- Blog section with similar card design
- Contact form validation
- Loading animations
- More interactive elements
### extra fancy additions:
1. **Add Google Analytics** - Track visitors
4. **Add testimonials/recommendations** - From colleagues/clients
5. **Create a timeline** - Visual career progression
### Easy enhancements:
- Add more social media links
- Include certifications section
- Add download resume button variations
- Include video background in hero section
- Add particle effect background

## 📞 Support

For issues or questions, refer to my GitHub repository.

---

**Built with ❤️ using HTML, CSS, and Vanilla JavaScript**
