export const initialCategories = [
  { id: 1, name: "food" },
  { id: 2, name: "groceries" },
  { id: 3, name: "travel" },
  { id: 4, name: "bills" },
  { id: 5, name: "donation" },
  { id: 6, name: "education" },
  { id: 7, name: "entertainment" },
  { id: 8, name: "insurance" },
  { id: 9, name: "loans" },
  { id: 10, name: "miscellaneous" },
];

const expenseTitles = [
  {
    category: "food",
    titles: [
      "Breakfast at Deli",
      "Lunch at Office Cafeteria",
      "Dinner at Italian Restaurant",
      "Snack from Vending Machine",
      "Fast Food Drive-Thru",
      "Coffee Shop Purchase",
      "Grocery Store – Produce",
      "Meal Delivery Service",
      "Bakery Purchase",
      "Restaurant Takeout",
    ],
  },
  {
    category: "groceries",
    titles: [
      "Weekly Vegetable Purchase",
      "Monthly Meat Stock",
      "Dairy Products",
      "Pantry Essentials",
      "Household Cleaning Supplies",
      "Beverages and Soft Drinks",
      "Snacks and Sweets",
      "Personal Care Products",
      "Canned Goods",
      "Pet Food",
    ],
  },
  {
    category: "travel",
    titles: [
      "Flight Tickets",
      "Hotel Accommodation",
      "Car Rental",
      "Fuel for Road Trip",
      "Public Transit Pass",
      "Taxis and Ride-Sharing",
      "Travel Insurance",
      "Meals while Traveling",
      "Souvenirs",
      "Parking Fees",
    ],
  },
  {
    category: "bills",
    titles: [
      "Electricity Bill",
      "Water Bill",
      "Gas Bill",
      "Internet Service",
      "Phone Bill",
      "Cable TV Subscription",
      "Rent/Mortgage Payment",
      "Credit Card Payment",
      "Loan Payment",
      "Property Tax",
    ],
  },
  {
    category: "donation",
    titles: [
      "Children's Charity",
      "Local Food Bank",
      "Wildlife Conservation",
      "Medical Research Fund",
      "Disaster Relief Fund",
      "Religious Institution Donation",
      "Sponsorship for Education",
      "Homeless Shelter Contribution",
      "Animal Shelter Donation",
      "Arts and Culture Support",
    ],
  },
  {
    category: "education",
    titles: [
      "School Tuition",
      "Online Course Subscription",
      "Textbooks and Study Materials",
      "Stationery Supplies",
      "Tutoring Services",
      "College Application Fees",
      "Educational Workshops",
      "Laboratory Fees",
      "School Uniforms",
      "Exam Fees",
    ],
  },
  {
    category: "entertainment",
    titles: [
      "Movie Tickets",
      "Concert Tickets",
      "Amusement Park Entrance",
      "Streaming Service Subscription",
      "Video Game Purchase",
      "Event Participation Fee",
      "Theatre Tickets",
      "Sports Event Tickets",
      "Museum Admission",
      "Party Supplies",
    ],
  },
  {
    category: "insurance",
    titles: [
      "Health Insurance Premium",
      "Life Insurance Premium",
      "Vehicle Insurance Payment",
      "Home Insurance Payment",
      "Travel Insurance",
      "Pet Insurance",
      "Dental Insurance",
      "Vision Insurance",
      "Disability Insurance",
      "Renters Insurance",
    ],
  },
  {
    category: "loans",
    titles: [
      "Student Loan Payment",
      "Personal Loan Repayment",
      "Auto Loan Installment",
      "Mortgage Payment",
      "Payday Loan Repayment",
      "Business Loan Payment",
      "Debt Consolidation Loan Payment",
      "Line of Credit Payment",
      "Loan Origination Fee",
      "Overdraft Fees",
    ],
  },
  {
    category: "miscellaneous",
    titles: [
      "Gift Purchases",
      "Home Repairs",
      "Clothing Shopping",
      "Hobby Supplies",
      "Gardening Materials",
      "Fitness Classes",
      "Beauty Treatments",
      "Tech Gadgets",
      "Household Appliances",
      "Subscription Boxes",
    ],
  },
];


export const getRandomTitle = (categoryIndex: number) => {
  const category = initialCategories[categoryIndex].name;
  const categoryTitles = expenseTitles.find(
    (item) => item.category === category
  )?.titles;
  if (categoryTitles) {
    const titleIndex = Math.floor(Math.random() * categoryTitles.length);
    return categoryTitles[titleIndex];
  }
};

export const getRandomAmount = () => {
  return Math.floor(Math.random() * 99999) + 1;
};


export const getRandomDate = () => {
  const start = new Date(2024, 0, 1).getTime();
  const end = new Date().getTime();
  const randomDate = new Date(start + Math.random() * (end - start));
  return randomDate.toISOString();
};
