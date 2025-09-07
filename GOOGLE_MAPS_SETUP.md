# Google Maps Setup Guide

## Quick Setup

### 1. Get Google Maps API Key
1. Go to [Google Cloud Console](https://console.cloud.google.com/google/maps-apis)
2. Create a new project or select existing one
3. Enable these APIs:
   - **Places API**
   - **Geocoding API** 
   - **Maps JavaScript API**

### 2. Create Environment File
Create a file named `.env` in the `frontend` directory:

```bash
# Google Maps API Key
REACT_APP_GOOGLE_MAPS_API_KEY=your_actual_api_key_here
```

### 3. Restart Development Server
After adding the API key, restart your development server:

```bash
npm start
# or
yarn start
```

## Testing

The debug component will show:
- ✅ API Key status
- ✅ Google Maps API loading status
- ❌ Error messages if something is wrong

## Troubleshooting

### Map Not Showing
1. **Check API Key**: Make sure it's correct in `.env` file
2. **Restart Server**: After adding API key, restart development server
3. **Check Console**: Open browser console for error messages
4. **API Quotas**: Verify your Google Cloud project has sufficient quotas

### Common Errors
- **"This API project is not authorized"**: Check API restrictions in Google Cloud Console
- **"Maps JavaScript API has not been used"**: Enable the Maps JavaScript API
- **"Failed to load Google Maps API"**: Check API key and internet connection

### Without API Key
The form works in fallback mode:
- Autocomplete uses mock Delhi locations
- Map selection shows error message
- All other functionality remains intact


