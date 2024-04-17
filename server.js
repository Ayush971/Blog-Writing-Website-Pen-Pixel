const express = require('express');
const path = require('path');
const fileupload = require('express-fileupload');
const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://ayushshah2021:q0hKD0ZiyiYIzqii@cluster0.ap0carm.mongodb.net/Blog-Writing?retryWrites=true&w=majority&appName=Cluster0")
    .then((result) => console.log('connected to db'))
    .catch((err) => console.log(err));

const blogSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true,
        trim: true // Remove leading/trailing whitespace
    },
    article: {
        type: String,
        required: true
    },
    bannerImage: {
        type: String, // Optional: URL path to the banner image
    },
    createdAt: { // Timestamp for creation time
        type: Date,
        default: Date.now
    }
});

const loginSchema = new mongoose.Schema({
    UserName: {
        type: String,
        required: true,
        trim: true // Remove leading/trailing whitespace
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    createdAt: { // Timestamp for creation time
        type: Date,
        default: Date.now
    }
});
      
// Create the Blog model using the schema
const Blog = mongoose.model('Blog', blogSchema);
const credentials = mongoose.model('login', loginSchema);

let initial_path = path.join(__dirname, "public");

const app = express();
app.use(express.static(initial_path));
app.use(express.json());
app.use(fileupload());

app.get('/', (req, res) => {
    res.sendFile(path.join(initial_path, "./uploads/home.html"));
})

app.get('/editor', (req, res) => {
    res.sendFile(path.join(initial_path, "./uploads/editor.html"));
})

app.get('/login', (req, res) => {
    res.sendFile(path.join(initial_path, "./uploads/login.html"));
})

app.get('/CreateAccount', (req, res) => {
    res.sendFile(path.join(initial_path, "./uploads/createAccount.html"));
})

app.post('/api/blogs', async (req, res) => {

    try {
        if (!req.body.title || !req.body.article) {
            return res.status(400).json({ success: false, message: 'Title and article are required' });
        }
      const newBlog = new Blog(req.body);
      await newBlog.save();
      res.json({ success: true, message: 'Blog created successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, message: 'Error creating blog' });
    }
});

app.post('/signup', async (req, res) => {
    try {
        const { UserName, email, password } = req.body; // Extract user data from request body
        const existingUser = await credentials.findOne({ email }); // Check if user already exists

        if (existingUser) {
            return res.send('User already exists'); // Return response if user already exists
        }

        // Create a new user document
        const newUser = new credentials({
            UserName,
            email,
            password
        });

        // Save the new user to the database
        await newUser.save();
        console.log('User saved successfully!');
        res.redirect('/login'); // Redirect to home page after signup
    } catch (error) {
        console.error(error);
        res.status(500).send('Signup failed due to an error');
    }
});

app.post('/api/login', async (req, res) => {
    const { UserName, password } = req.body;

    try {
        const user = await credentials.findOne({ UserName });

        if (!user || user.password !== password) {
            return res.status(401).json({ success: false, message: 'Invalid username or password' });
        }

        res.status(200).json({ success: true, message: 'Login successful' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

// upload link
app.post('/upload', (req, res) => {
    let file = req.files.image;
    let date = new Date();
    // image name
    let imagename = date.getDate() + date.getTime() + file.name;
    // image upload path
    let path = 'public/uploads/' + imagename;

    // create upload
    file.mv(path, (err, result) => {
        if(err){
            throw err;
        } else{
            // our image upload path
            res.json(`uploads/${imagename}`)
        }
    })
})

app.get("/:blog", (req, res) => {
    res.sendFile(path.join(initial_path, "./uploads/blog.html"));
})

app.get('/api/blogs/:blogId', async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.blogId);
        if (blog) {
            res.json(blog);
        } else {
            res.status(404).json({ error: 'Blog not found' });
        }
    } catch (error) {
        console.error('Error retrieving blog:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/api/blogs', async (req, res) => {
    try {
        const blogs = await Blog.find(); 
        res.json(blogs);
    } catch (error) {
        console.error('Error retrieving blogs:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


app.use((req, res) => {
    res.json("404");
})

app.listen("3000", () => {
    console.log('listening......');
})