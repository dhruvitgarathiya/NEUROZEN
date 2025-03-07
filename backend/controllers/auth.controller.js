const { google } = require('googleapis');
const { oAuth2Client, SCOPES, initializeAPIs } = require("../config/google.config");

let userProfileData;

async function getUserProfile(auth) {
    try {
        await initializeAPIs(); // Ensure APIs are initialized

        const service = google.people({ 
            version: "v1", 
            auth,
            timeout: 5000 // Add timeout
        });

        const profile = await service.people.get({
            resourceName: "people/me",
            personFields: "names,photos,emailAddresses",
        });

        return {
            displayName: profile.data.names?.[0]?.displayName || 'Unknown',
            profilePhotoUrl: profile.data.photos?.[0]?.url || '',
            userID: parseInt(profile.data.resourceName.replace("people/", ""), 10),
            email: profile.data.emailAddresses?.[0]?.value || ''
        };
    } catch (error) {
        console.error("Error fetching user profile:", error);
        throw new Error(`Failed to fetch user profile: ${error.message}`);
    }
}

const googleAuth = (req, res) => {
    try {
        const authUrl = oAuth2Client.generateAuthUrl({
            access_type: 'offline',
            scope: SCOPES,
        });
        res.status(200).json({
            success: true,
            authUrl
        });
    } catch (error) {
        console.error("Error generating auth URL:", error);
        res.status(500).json({
            success: false,
            message: "Failed to generate auth URL",
            error: error.message
        });
    }
};

const googleCallback = async (req, res) => {
  const { code } = req.query;
  try {
    const { tokens } = await oAuth2Client.getToken(code);
    oAuth2Client.setCredentials(tokens);
    console.log(tokens);

    // Add delay to ensure API is enabled
    await new Promise(resolve => setTimeout(resolve, 2000));

    const profile = await getUserProfile(oAuth2Client);
    req.session.tokens = tokens; // Store tokens in session
    req.session.userProfile = profile; // Store userProfile in session
    userProfileData = profile; // Set userProfileData here
  
    res.status(200).json({
      success: true,
      message: "Authentication successful",
      profile
    });
  } catch (error) {
    console.error("Authentication error:", error);
    res.status(400).json({
      success: false,
      message: "Authentication failed",
      error: error.message
    });
  }
};

module.exports = {
  googleAuth,
  googleCallback,
  userProfileData
};