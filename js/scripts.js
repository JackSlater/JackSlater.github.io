// GitHub Stats Sync Script
// Add this to your existing js/scripts.js or create a new file

async function fetchGitHubStats(username) {
    try {
        // Fetch user data and repositories
        const [userResponse, reposResponse] = await Promise.all([
            fetch(`https://api.github.com/users/${username}`),
            fetch(`https://api.github.com/users/${username}/repos?per_page=100`)
        ]);

        const userData = await userResponse.json();
        const reposData = await reposResponse.json();

        // Calculate stats
        const stats = {
            publicRepos: userData.public_repos,
            totalCommits: await getTotalCommits(username, reposData),
            languages: await getUniqueLanguages(username, reposData),
            followers: userData.followers,
            following: userData.following
        };

        // Update the DOM
        updateStatsDisplay(stats);
        
    } catch (error) {
        console.error('Error fetching GitHub stats:', error);
        // Fallback to static numbers if API fails
        updateStatsDisplay({
            publicRepos: 3,
            totalCommits: 30,
            languages: 10
        });
    }
}

async function getTotalCommits(username, repos) {
    let totalCommits = 0;
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

    // Get commits for each repo (limited to avoid rate limiting)
    const repoPromises = repos.slice(0, 10).map(async (repo) => {
        try {
            const response = await fetch(
                `https://api.github.com/repos/${username}/${repo.name}/commits?author=${username}&since=${oneYearAgo.toISOString()}&per_page=100`
            );
            const commits = await response.json();
            return Array.isArray(commits) ? commits.length : 0;
        } catch {
            return 0;
        }
    });

    const commitCounts = await Promise.all(repoPromises);
    return commitCounts.reduce((sum, count) => sum + count, 0);
}

async function getUniqueLanguages(username, repos) {
    const languages = new Set();
    
    // Get languages for each repo (limited to avoid rate limiting)
    const languagePromises = repos.slice(0, 20).map(async (repo) => {
        try {
            const response = await fetch(`https://api.github.com/repos/${username}/${repo.name}/languages`);
            const repoLanguages = await response.json();
            Object.keys(repoLanguages).forEach(lang => languages.add(lang));
        } catch {
            // Skip if error
        }
    });

    await Promise.all(languagePromises);
    return languages.size;
}

function updateStatsDisplay(stats) {
    // Update the stat numbers in your HTML
    const projectsElement = document.querySelector('.stat-item:nth-child(1) .stat-number');
    const commitsElement = document.querySelector('.stat-item:nth-child(2) .stat-number');
    const languagesElement = document.querySelector('.stat-item:nth-child(3) .stat-number');

    if (projectsElement) projectsElement.textContent = stats.publicRepos;
    if (commitsElement) commitsElement.textContent = stats.totalCommits;
    if (languagesElement) languagesElement.textContent = stats.languages;

    // Add loading animation fade out
    document.querySelectorAll('.stat-number').forEach(el => {
        el.style.opacity = '0';
        setTimeout(() => {
            el.style.opacity = '1';
            el.style.transition = 'opacity 0.5s ease';
        }, 100);
    });
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Replace 'JackSlater' with your actual GitHub username
    const githubUsername = 'JackSlater';
    
    // Add loading state
    document.querySelectorAll('.stat-number').forEach(el => {
        el.style.opacity = '0.5';
        el.textContent = '...';
    });
    
    // Fetch real stats
    fetchGitHubStats(githubUsername);
});

// Optional: Refresh stats every 5 minutes
setInterval(() => {
    fetchGitHubStats('JackSlater');
}, 5 * 60 * 1000);