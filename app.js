// DOM Elements
const plannerForm = document.getElementById('plannerForm');
const userContext = document.getElementById('userContext');
const budgetLimit = document.getElementById('budgetLimit');
const welcomeState = document.getElementById('welcomeState');
const loaderState = document.getElementById('loaderState');
const workspaceState = document.getElementById('workspaceState');
const mealsGrid = document.getElementById('mealsGrid');
const taskList = document.getElementById('taskList');
const groceryList = document.getElementById('groceryList');
const substitutionList = document.getElementById('substitutionList');
const budgetBanner = document.getElementById('budgetBanner');
const budgetBannerTitle = document.getElementById('budgetBannerTitle');
const budgetBannerDesc = document.getElementById('budgetBannerDesc');
const budgetBannerIcon = document.getElementById('budgetBannerIcon');
const mockModeCheckbox = document.getElementById('mockMode');
const tabButtons = document.querySelectorAll('.tab-btn');
const tabPanes = document.querySelectorAll('.tab-pane');

// Mock Data for Offline Simulator
const mockPlanData = {
  meals: [
    { type: 'Aero-Breakfast', name: 'High-Protein Grain Oats with Organic Honey', desc: 'Light rolled oats steamed in coconut milk, seasoned with wild honey, sliced bananas, and pure whey isolate.', cost: 120 },
    { type: 'Aero-Lunch', name: 'Mediterranean Herb Chicken & Saffron Rice Bowl', desc: 'Tender chicken slices marinated in lemon-oregano glaze, served on long-grain saffron rice with steamed broccoli florets.', cost: 180 },
    { type: 'Aero-Dinner', name: 'Spiced Paneer Scramble & Wilted Spinach Sourdough', desc: 'Whipped egg white scramble loaded with freshly grated paneer, organic baby spinach, and grilled artisan sourdough toast.', cost: 110 }
  ],
  tasks: [
    { text: 'Mise en place: Wash, chop, and portion green vegetables & fresh toppings' },
    { text: 'Simmer long-grain saffron rice and prepare broccoli in double-boiler' },
    { text: 'Sear organic chicken breast in light extra virgin olive oil (5-7 mins)' },
    { text: 'Whisk eggs and scramble with fresh baby spinach and spices' },
    { text: 'Prepare rolled oats base and garnish with banana toppings' }
  ],
  grocery: [
    { name: 'Rolled Oats', qty: '150g' },
    { name: 'Wild Honey', qty: '1 bottle' },
    { name: 'Saffron Rice', qty: '250g' },
    { name: 'Organic Chicken Breast', qty: '300g' },
    { name: 'Fresh Paneer', qty: '150g' },
    { name: 'Broccoli & Baby Spinach', qty: '1 unit' }
  ],
  substitutions: [
    { original: 'Chicken Breast', replacement: 'Organic Firm Tofu / Seitan Strips' },
    { original: 'Whey Isolate', replacement: 'Hemp Seed Protein powder' },
    { original: 'Saffron Rice', replacement: 'Red Quinoa / Couscous grains' }
  ]
};

// Initialize Lucide Icons
lucide.createIcons();

// Tab Switch Logic
tabButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const target = btn.getAttribute('data-target');

    tabButtons.forEach(b => b.classList.remove('active'));
    tabPanes.forEach(p => p.classList.remove('active'));

    btn.classList.add('active');
    document.getElementById(target).classList.add('active');
  });
});

// Form Validation and submission handler
plannerForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  // Simple validation checks (Data Gates)
  let isValid = true;

  if (!userContext.value.trim()) {
    document.getElementById('contextError').style.display = 'block';
    userContext.parentElement.classList.add('invalid');
    isValid = false;
  } else {
    document.getElementById('contextError').style.display = 'none';
    userContext.parentElement.classList.remove('invalid');
  }

  const budget = parseFloat(budgetLimit.value);
  if (isNaN(budget) || budget < 50) {
    document.getElementById('budgetError').style.display = 'block';
    budgetLimit.parentElement.parentElement.classList.add('invalid');
    isValid = false;
  } else {
    document.getElementById('budgetError').style.display = 'none';
    budgetLimit.parentElement.parentElement.classList.remove('invalid');
  }

  if (!isValid) return;

  // Transition to Loader State
  welcomeState.classList.remove('active');
  workspaceState.classList.remove('active');
  loaderState.classList.add('active');

  try {
    let result;
    if (mockModeCheckbox.checked) {
      // Simulation delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      result = mockPlanData;
    } else {
      // Real API Mode (Call localhost server or Gemini API)
      result = await callRealAI(userContext.value, budget);
    }

    renderPlan(result, budget);
  } catch (error) {
    console.error('Plan generation failed', error);
    alert('Failed to generate AI plan. Switching to simulation mode.');
    renderPlan(mockPlanData, budget);
  }
});

// Mock/Real AI API Fetcher logic
async function callRealAI(context, budget) {
  // Tomorrow during hackathon, replace this endpoint with live dev backend
  const response = await fetch('/api/epicure-generate-plan', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ context, budget })
  });
  if (!response.ok) throw new Error('API Error');
  return response.json();
}

// Render logic
function renderPlan(data, userBudget) {
  // 1. Render Meals
  mealsGrid.innerHTML = '';
  let totalCost = 0;

  data.meals.forEach(meal => {
    totalCost += meal.cost;
    const card = document.createElement('div');
    card.className = 'meal-card glass-card';
    card.innerHTML = `
      <span class="meal-type">${meal.type}</span>
      <h3>${meal.name}</h3>
      <p>${meal.desc}</p>
      <div class="meal-cost">Estimated Cost: ₹${meal.cost}</div>
    `;
    mealsGrid.appendChild(card);
  });

  // 2. Budget verification UI
  budgetBanner.className = 'budget-banner';
  if (totalCost <= userBudget) {
    budgetBanner.classList.add('success');
    budgetBannerTitle.textContent = `Budget Check: Feasible (₹${totalCost} / ₹${userBudget})`;
    budgetBannerDesc.textContent = 'Estimated meal plan cost is within your daily spending budget limit.';
    budgetBannerIcon.setAttribute('data-lucide', 'check-circle');
  } else {
    budgetBanner.classList.add('warning');
    budgetBannerTitle.textContent = `Budget Check: Over Limit (₹${totalCost} / ₹${userBudget})`;
    budgetBannerDesc.textContent = 'AeroChef suggests checking substitutions or adjusting portion sizes to save costs.';
    budgetBannerIcon.setAttribute('data-lucide', 'alert-triangle');
  }

  // 3. Render Tasks
  taskList.innerHTML = '';
  data.tasks.forEach((task, idx) => {
    const item = document.createElement('li');
    item.className = 'task-item';
    item.innerHTML = `
      <input type="checkbox" id="task-${idx}" class="task-checkbox">
      <label for="task-${idx}" class="task-text">${task.text}</label>
    `;
    // Toggle completed state class on change
    item.querySelector('.task-checkbox').addEventListener('change', (e) => {
      if (e.target.checked) {
        item.classList.add('completed');
      } else {
        item.classList.remove('completed');
      }
    });
    taskList.appendChild(item);
  });

  // 4. Render Grocery Items
  groceryList.innerHTML = '';
  data.grocery.forEach(g => {
    const item = document.createElement('li');
    item.className = 'grocery-item';
    item.innerHTML = `
      <span class="g-name">${g.name}</span>
      <span class="g-qty">${g.qty}</span>
    `;
    groceryList.appendChild(item);
  });

  // 5. Render Substitutions
  substitutionList.innerHTML = '';
  data.substitutions.forEach(s => {
    const item = document.createElement('li');
    item.className = 'sub-item';
    item.innerHTML = `
      <span class="sub-original">${s.original}</span>
      <span class="sub-replacement">↳ Use ${s.replacement}</span>
    `;
    substitutionList.appendChild(item);
  });

  // Re-generate Lucide Icons for dynamic content
  lucide.createIcons();

  // Switch states
  loaderState.classList.remove('active');
  workspaceState.classList.add('active');
}
