# Convex Backend for Easy English

## 📁 Structure

```
convex/
├── schema.ts          # Database schema
├── auth.ts            # Authentication (Google OAuth)
├── http.ts            # HTTP routes (OAuth callback)
├── users.ts           # User management functions
├── progress.ts        # Progress tracking
├── vocabulary.ts      # Vocabulary management
├── leaderboard.ts     # Leaderboard functions
└── tsconfig.json      # TypeScript config
```

## 🗄️ Database Schema

### Tables

1. **users** - User profiles and settings
   - Profile: username, email, avatar
   - Progress: totalXP, currentLevel, streaks
   - Settings: theme, notifications, dailyGoal

2. **userProgress** - Learning progress tracking
   - Completed lessons
   - XP by category (vocabulary, grammar, etc.)
   - Current lesson state

3. **lessonCompletions** - Individual lesson results
   - Completion data, accuracy, time taken
   - Question results
   - Attempt tracking

4. **vocabulary** - User's learned vocabulary
   - Word, translation, pronunciation
   - Spaced repetition (nextReviewDate, difficulty)
   - Learning stats

5. **streaks** - Daily activity tracking
   - XP earned per day
   - Lessons completed
   - Streak count

6. **leaderboard** - Global rankings
   - totalXP, weeklyXP, monthlyXP
   - Rankings: globalRank, countryRank

## 🔐 Authentication

### Google OAuth

Providers configured:
- ✅ Google OAuth

Required environment variables:
- `AUTH_GOOGLE_ID` - Your Google OAuth Client ID
- `AUTH_GOOGLE_SECRET` - Your Google OAuth Client Secret

### Authentication Flow

1. User clicks "Sign in with Google"
2. Redirects to Google OAuth
3. Google redirects back to Convex callback URL
4. Convex creates/updates user in database
5. Returns JWT token to client
6. Client stores token and makes authenticated requests

## 🚀 Functions

### Users (`users.ts`)

- `getCurrentUser()` - Get current user profile
- `updateProfile()` - Update user info
- `updateSettings()` - Update app settings
- `getUserByUsername()` - Get public profile
- `addXP()` - Add XP to user

### Progress (`progress.ts`)

- `getUserProgress()` - Get learning progress
- `completeLesson()` - Record lesson completion
- `getLessonCompletions()` - Get completion history
- `getStreaks()` - Get streak data

### Vocabulary (`vocabulary.ts`)

- `addWord()` - Add word to vocabulary
- `getUserVocabulary()` - Get user's words
- `getWordsForReview()` - Spaced repetition
- `reviewWord()` - Review a word
- `getVocabularyStats()` - Stats overview

### Leaderboard (`leaderboard.ts`)

- `getGlobalLeaderboard()` - Top users
- `getUserRank()` - User's ranking
- `getNearbyUsers()` - Users around you
- `getFriendsLeaderboard()` - Friends only

## 🔑 JWT & Tokens

Convex Auth automatically handles:
- ✅ JWT token generation
- ✅ Token refresh
- ✅ Session management
- ✅ Secure token storage

The client automatically includes the JWT in all requests to authenticated functions.

## 📱 Client Integration

### React Native

```typescript
import { useConvex, useMutation, useQuery } from "convex/react";
import { api } from "../convex/_generated/api";

// Get current user
const user = useQuery(api.users.getCurrentUser);

// Complete lesson
const completeLesson = useMutation(api.progress.completeLesson);

// Sign in with Google
const { signIn } = useAuthActions();
await signIn("google");
```

## 🔒 Security

- ✅ All mutations require authentication
- ✅ Queries filter by userId
- ✅ No direct database access from client
- ✅ OAuth handled server-side
- ✅ JWT tokens expire automatically

## 📊 Indexes

Optimized indexes for:
- User lookups (by userId, email, username)
- Progress queries (by userId, lessonId)
- Leaderboard rankings (by totalXP, weeklyXP)
- Vocabulary retrieval (by userId, word)
- Streak tracking (by userId, date)

## 🎯 Next Steps

1. Deploy Convex backend
2. Configure OAuth credentials
3. Integrate with React Native app
4. Test authentication flow
5. Implement remaining features
