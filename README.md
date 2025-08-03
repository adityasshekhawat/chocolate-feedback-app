# Chocolate Feedback App

A beautiful, minimal feedback collection web app for homemade chocolates, designed with a Notion-like aesthetic and powered by Firebase.

## Features

- 🍫 Beautiful chocolate-themed design with 3D floating animations
- 📱 Mobile-responsive layout
- ✨ Smooth animations with Framer Motion
- 🎨 Notion-inspired UI with Chakra UI
- 📝 Customer feedback collection
- ⭐ Rating system with emojis
- 🎯 Contact information collection
- 🔥 **Firebase integration** for real-time data storage
- ✅ **Form validation** with error handling
- 📊 **Admin dashboard** to view feedback

## Form Fields

- **Name** (required)
- **Email** (optional)
- **Phone Number** (optional) 
- **Rating** (required) - 1-5 stars with descriptive text
- **Favorite Product** (optional) - Chocolate type selection
- **Feedback** (required) - Open text feedback

## Tech Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **UI Library**: Chakra UI
- **Animations**: Framer Motion
- **Icons**: React Icons (Feather)
- **Database**: Firebase Firestore
- **Styling**: Inter font + custom CSS

## Firebase Setup

### 1. Create Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or use existing one
3. Enable Firestore Database

### 2. Database Structure
The app stores feedback in the `choco_checkin` collection with the following structure:

```json
{
  "name": "string",
  "email": "string (optional)",
  "phone": "string (optional)",
  "rating": "string (1-5)",
  "feedback": "string",
  "favoriteProduct": "string (optional)",
  "submittedAt": "Timestamp",
  "userAgent": "string",
  "ipAddress": "string"
}
```

### 3. Firestore Rules
Set up the following security rules in Firestore:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow read/write access to choco_checkin collection
    match /choco_checkin/{document} {
      allow read, write: if true; // Adjust based on your security needs
    }
  }
}
```

### 4. Configuration
The Firebase configuration is already set up in `src/firebase/config.ts` with your project credentials.

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Deployment Options

### 1. Netlify (Recommended)
1. Build the project: `npm run build`
2. Drag the `dist` folder to [Netlify Drop](https://app.netlify.com/drop)
3. Get your URL for QR code generation

### 2. Vercel
1. Push code to GitHub
2. Import project on [Vercel](https://vercel.com)
3. Deploy automatically

### 3. Firebase Hosting
```bash
npm install -g firebase-tools
firebase login
firebase init hosting
npm run build
firebase deploy
```

### 4. GitHub Pages
1. Install gh-pages: `npm install --save-dev gh-pages`
2. Add to package.json: `"homepage": "https://username.github.io/repository"`
3. Add deploy script: `"deploy": "gh-pages -d dist"`
4. Run: `npm run build && npm run deploy`

## Viewing Feedback Data

### Option 1: Firebase Console
- Go to your Firebase Console
- Navigate to Firestore Database
- View the `choco_checkin` collection

### Option 2: Admin Dashboard (Optional)
- Update `src/App.tsx` to show the AdminDashboard component
- Access at `/admin` or replace the main form temporarily

## Data Export

You can export feedback data from Firebase Console:
1. Go to Firestore Database
2. Select the `choco_checkin` collection
3. Use the export feature or write a script

## QR Code Generation

Once deployed, use your app URL with any QR code generator:
- [QR Code Generator](https://www.qr-code-generator.com/)
- [QRCode Monkey](https://www.qrcode-monkey.com/)

## Security Considerations

For production use, consider:
1. **Firestore Security Rules**: Restrict write access based on your needs
2. **Rate Limiting**: Implement rate limiting to prevent spam
3. **Data Validation**: Server-side validation with Cloud Functions
4. **CORS Configuration**: Proper CORS settings for your domain

## Analytics & Insights

The stored data includes:
- **Submission timestamp** for time-based analysis
- **User agent** for device/browser insights
- **Rating distribution** for quality metrics
- **Product preferences** for inventory decisions

## License

MIT License - feel free to use for your chocolate business! 🍫
