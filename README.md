# 💰 BudgetBuddy

A smart, user-friendly budget management application that helps you take control of your finances.

## 🎯 Features

- **📊 Track Transactions**: Easily log income and expenses
- **💳 Wallet Management**: View your balance, income, and expenses at a glance
- **🎯 Savings Goals**: Create and track multiple savings goals
- **📈 Visual Reports**: See spending patterns with interactive charts
- **📄 Export to PDF**: Generate transaction reports for your records
- **🌙 Dark Mode**: Comfortable viewing in any lighting condition
- **🔐 Secure**: All data is stored locally on your device
- **📱 Progressive Web App**: Install as an app on your device
- **🤖 AI Assistant**: Get personalized financial tips and advice

## 🚀 Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- No server or internet connection required for basic use

### Installation

1. Clone or download the repository:
```bash
git clone https://github.com/Lunga200/My-Project.git
cd My-Project
```

2. Open `index.html` in your web browser, or run a local server:
```bash
# Using Python 3
python -m http.server 8000

# Using Node.js (if you have http-server installed)
npx http-server
```

3. Visit `http://localhost:8000` in your browser

### First Time Usage

1. Go to the **Register** page and create an account
2. Fill in your name, email, and password
3. Login with your credentials
4. Start tracking your finances on the dashboard

## 📁 Project Structure

```
My-Project/
├── index.html              # Landing page
├── login.html              # Login page
├── register.html           # Registration page
├── dashboard.html          # Main dashboard
├── transactions.html       # Transaction history
├── wallet.html             # Wallet overview
├── goals.html              # Savings goals
├── reports.html            # Financial reports
├── ai-assistant.html       # AI assistant
├── settings.html           # User settings
├── app.js                  # Main application logic
├── auth.js                 # Authentication logic
├── style.css               # Styles with dark mode
├── service-worker.js       # PWA service worker
├── manifest.json           # PWA manifest
├── manifest-icon.svg       # App icon
└── serve.py                # Simple Python server (optional)
```

## 🔐 Security & Privacy

- **No Server**: Your data never leaves your device
- **Local Storage**: All information is stored in your browser's localStorage
- **No Third-party Tracking**: We don't collect or share your data
- **Password Security**: Passwords are hashed before storage (use HTTPS in production)

### ⚠️ Important Notes

This application uses browser-based storage. For production use with sensitive financial data:
- Consider migrating to a server-based solution with proper encryption
- Use HTTPS for all communications
- Implement proper backend authentication with bcrypt password hashing
- Add data backup functionality

## 💻 Technology Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Storage**: Browser LocalStorage
- **Charts**: Chart.js
- **PDF Export**: jsPDF
- **Icons**: SVG

## 🎨 Customization

### Change Theme Colors

Edit `style.css` and update the color values:
```css
:root {
  color-scheme: light;
  color: #102a43;        /* Change text color */
  background: #f7f5f3;   /* Change background */
}
```

### Modify Currency

Change the currency symbol in `app.js`:
```javascript
// Replace 'R' with your currency symbol (e.g., '$', '€', '£')
balanceEl.textContent = `$${balance.toFixed(2)}`;
```

## 📱 Progressive Web App

BudgetBuddy can be installed as a PWA:

1. Open in a compatible browser (Chrome, Firefox, Edge)
2. Look for the "Install" or "Add to Home Screen" option
3. Confirm installation
4. Access BudgetBuddy like a native app

## 🐛 Troubleshooting

### "No transactions yet" message
- This is normal for new accounts. Add some transactions to get started.

### Dark mode not working
- Ensure JavaScript is enabled in your browser
- Clear browser cache and reload the page

### Data not saving
- Check if LocalStorage is enabled in your browser
- Ensure you have storage space available
- Try clearing browser cache (this will also clear stored data)

## 📝 Usage Examples

### Adding a Transaction
1. Navigate to **Dashboard** or **Transactions**
2. Click **Add Income** or **Add Expense**
3. Enter the amount
4. View updates in your wallet and charts

### Setting a Savings Goal
1. Go to **Goals** section
2. Enter goal name (e.g., "New Laptop")
3. Enter target amount
4. Click **Add Goal**
5. Track progress on the dashboard

### Exporting Your Data
1. Go to **Reports** page
2. Click **Export PDF**
3. Your transaction report will download

## 🤝 Contributing

Contributions are welcome! To contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📋 Roadmap

- [ ] Cloud sync (optional, privacy-respecting)
- [ ] Multi-currency support
- [ ] Advanced budget categorization
- [ ] Recurring transactions
- [ ] Data import/export
- [ ] Mobile app versions
- [ ] Offline-first improvements

## 📄 License

This project is open source and available under the MIT License.

## 👨‍💻 Author

**Lunga200**

- GitHub: [@Lunga200](https://github.com/Lunga200)
- Project: [My-Project](https://github.com/Lunga200/My-Project)

## 🙏 Acknowledgments

- [Chart.js](https://www.chartjs.org/) - For beautiful charts
- [jsPDF](https://github.com/parallax/jsPDF) - For PDF generation
- [Inter Font](https://fonts.google.com/specimen/Inter) - For typography

## 📞 Support

If you encounter any issues or have suggestions:

1. Check the [Troubleshooting](#troubleshooting) section
2. Search existing [GitHub Issues](https://github.com/Lunga200/My-Project/issues)
3. Create a new issue with details about your problem

## 🔄 Version History

### v1.0.0 (Current)
- Initial release
- Basic transaction tracking
- Savings goals
- Transaction reports
- Dark mode support
- PWA support

---

**Happy Budgeting! 💰**
