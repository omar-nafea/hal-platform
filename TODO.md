# TODO: Apply Upseeds Color Variables and Remove Background Photos

## Approved Plan
- Apply the specified CSS variables globally across the project.
- Remove all background images/photos from the project.

## Steps to Complete
- [x] Step 1: Remove the `.bg-hero` class from `src/index.css` that sets a background image.
- [x] Step 2: Update `src/components/Navbar/Navbar.jsx` to remove the inline `backgroundImage` style and set a solid background using `var(--primary-color)`.
- [x] Step 3: Update `src/components/Hero/Hero_Section.jsx` to remove the inline `backgroundImage` style and set a solid background using `var(--primary-color)`, while keeping the overlay for readability.
