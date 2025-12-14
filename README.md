**Project Name: BlogMate**
---

link: https://medium-bmohitp.vercel.app/home

## Description:

BlogMate is a blogging platform where users can sign up, create blog posts, and view other users' content. The application uses PostgreSQL for data storage, Node.js for backend development, React for the frontend interface, and Tailwind CSS for styling. The application is built using the Hono app framework and uses Wrangler for deployment.

---

## Features:

1. **Signup and Signin Pages:**
   - Users can create an account or log in with existing credentials.
   - The `Auth` component is used to handle both signup and signin, depending on the context.
   - The `Quote` component provides a motivational quote on the signup/signin page, visible on larger screens.

2. **Publish Page:**
   - Authenticated users can create and publish new blog posts.
   - A `TextEditor` component allows users to write their content.
   - Posts include a title and body content, which are then stored in the PostgreSQL database.
   - Upon publishing, users are redirected to view their blog post.

3. **Blogs Page:**
   - Displays a list of all available blog posts.
   - Each blog post is represented by a `BlogCard` component.
   - If data is still loading, skeleton loaders (`BlogSkeleton`) are shown.

4. **Blog Page:**
   - Displays the full content of a single blog post.
   - Uses the `FullBlog` component to render the blog details.
   - If data is still loading or unavailable, a skeleton loader (`FullBlogSkeleton`) is displayed.

---

## Technologies Used:

- **Frontend:**
  - React
  - Tailwind CSS

- **Backend:**
  - Node.js
  - PostgreSQL

- **Framework:**
  - Hono

- **Deployment:**
  - Wrangler

---

## Installation:

1. **Clone the repository:**
   ```
   git clone https://github.com/bmohitprasad/medium-clone.git
   ```

2. **Install dependencies:**
   ```
   cd BlogMate
   npm install
   ```

3. **Set up PostgreSQL database:**
   - Create a new PostgreSQL database.
   - Run the necessary SQL scripts to set up the required tables.
   - Update the database connection string in your environment configuration.

4. **Configure Wrangler:**
   - Ensure Wrangler is installed: `npm install -g wrangler`.
   - Configure the `wrangler.toml` file with your Cloudflare Workers and Hono app settings.

5. **Start the development server:**
   ```
   npm start
   ```

6. **Access the application:**
   - Open your browser and navigate to `http://localhost:3000`.

---

## Usage:

1. **Signup/Signin:**
   - Navigate to the signup or signin page.
   - Provide your credentials to create an account or log in.

2. **Publish Blog Post:**
   - Go to the publish page.
   - Enter the title and content for your blog post.
   - Click "Publish post" to save and publish your content.

3. **View Blogs:**
   - Browse through the list of available blog posts on the blogs page.
   - Click on any blog post to read the full content.

---

## License:

This project is licensed under the [MIT License](LICENSE).

---

## Acknowledgements:

- Thanks to [Hono](https://hono.dev/) for the lightweight web framework.

---
