# 🎓 Global UniVerse: World University Rankings Explorer

![Status](https://img.shields.io/badge/Status-Complete-success)
![Tech Stack](https://img.shields.io/badge/Stack-Python_|_JS_|_PowerBI-blue)

A comprehensive data exploration and visualization platform centered on global educational excellence. This project tracks thousands of institutions from 2011 to 2016 across dimensions like teaching quality, research influence, and international outlook.

## 📋 About the Project
This project analyzes **World University Rankings** using datasets from **Times Higher Education** and **CWUR**. It identifies the key factors that contribute to a university's global standing and uncovers hidden correlations between institutional metrics.

### 🔍 Key Insights
- **Core Drivers**: Research influence (**0.92 correlation**) and Teaching quality (**0.91 correlation**) are the primary factors for global ranking.
- **Global Trends**: While the USA and UK lead in institution counts, countries like **Singapore** and **China** show high average global scores.

## 🛠️ The Tech Stack
*   **Data Analysis**: Python (Pandas, NumPy)
*   **Exploration**: Jupyter Notebooks
*   **Business Intelligence**: Power BI (`.pbix`)
*   **Web Dashboard**: Vite, Vanilla JavaScript, CSS (Glassmorphism)
*   **Visualizations**: Chart.js, PapaParse

## 🚀 Interactive Web Dashboard
The project includes a premium, interactive web dashboard located in the `/dashboard` directory. It features:
- **Real-time Charts**: Compare university scores and country distributions.
- **Dynamic Filtering**: Switch between years (2011-2016) and search for specific institutions.
- **Modern UI**: Implements a high-end "Glassmorphism" aesthetic.

### How to Run Locally
1. Navigate to the dashboard: `cd dashboard`
2. Install dependencies: `npm install`
3. Start the dev server: `npm run dev`

## 📊 Data Cleaning & Preprocessing
The analysis involved rigorous data wrangling:
- Standardizing world ranks (handling range-based strings).
- Median imputation for missing values in critical metrics.
- Standardizing numeric formats (removing `%`, `,`, etc.).

---
*Created as part of a Data Excellence project.*
