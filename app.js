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
const checkoutPremiumBtn = document.getElementById('btnCheckoutPremium');
const headerUpgradeBtn = document.getElementById('headerUpgradeBtn');

// Navigation Tabs
const sidebarLinks = document.querySelectorAll('.nav-link');
const viewPanes = document.querySelectorAll('.view-pane');

// Inner Workspace tabs
const workspaceTabs = document.querySelectorAll('.w-tab-btn');
const workspacePanes = document.querySelectorAll('.w-tab-pane');

// Video Elements
const simVideo = document.getElementById('simVideo');
const playBtnOverlay = document.getElementById('playBtnOverlay');
const btnPlayPause = document.getElementById('btnPlayPause');
const btnMute = document.getElementById('btnMute');
const btnReset = document.getElementById('btnReset');
const telemetryTimer = document.getElementById('telemetryTimer');
const localVideoFile = document.getElementById('localVideoFile');

// Dynamic // Helper to generate dynamic plan based on context and budget input values
function generateDynamicPlan(context, userBudget) {
  const normalized = context.toLowerCase();
  
  // Custom dish overrides
  let customBreakfast = null;
  let customLunch = null;
  let customDinner = null;

  // Search for specific common food keywords
  if (normalized.includes('waffle') || normalized.includes('pancake')) {
    customBreakfast = {
      name: 'Fluffy Protein Waffles & Berries',
      desc: 'Freshly baked wheat waffles topped with fresh blueberries, strawberries, and organic maple syrup.',
      cost: 135,
      ingredients: ['Protein waffle mix', 'Fresh berries', 'Organic maple syrup', 'Greek yogurt']
    };
  } else if (normalized.includes('smoothie') || normalized.includes('shake')) {
    customBreakfast = {
      name: 'Hyper-Nutrient Power Smoothie',
      desc: 'Spinach, almond milk, peanut butter, chia seeds, and vegan chocolate protein blended with ice.',
      cost: 110,
      ingredients: ['Vegan protein powder', 'Almond milk', 'Organic peanut butter', 'Chia seeds', 'Baby spinach']
    };
  } else if (normalized.includes('poha')) {
    customBreakfast = {
      name: 'Indori Spiced Poha',
      desc: 'Steamed flattened rice flakes tempered with mustard seeds, turmeric, green chillies, and roasted peanuts.',
      cost: 70,
      ingredients: ['Flattened rice (Poha)', 'Mustard seeds & Turmeric', 'Peanuts', 'Green chillies & Lemon']
    };
  }

  if (normalized.includes('butter chicken')) {
    customLunch = {
      name: 'Classic Butter Chicken & Garlic Naan',
      desc: 'Charcoal-grilled chicken tikka simmered in a rich, buttery tomato-cashew gravy, served with fresh garlic naan.',
      cost: 240,
      ingredients: ['Boneless chicken breast', 'Butter & Cream', 'Tomato puree & Cashews', 'Garlic naan bread']
    };
  } else if (normalized.includes('burger')) {
    customLunch = {
      name: 'Epicure Crafted Smash Burger',
      desc: 'Double smashed grass-fed patty (or premium plant-based patty) with melted cheddar, pickles, and house sauce on a toasted brioche bun.',
      cost: 220,
      ingredients: ['Smash patties (Beef or Plant)', 'Cheddar cheese slices', 'Brioche buns', 'House burger sauce', 'Pickles']
    };
  } else if (normalized.includes('pizza')) {
    customLunch = {
      name: 'Artisanal Thin-Crust Pizza',
      desc: 'Stone-baked sourdough crust topped with rich marinara sauce, fresh buffalo mozzarella, cherry tomatoes, and aromatic basil.',
      cost: 250,
      ingredients: ['Sourdough pizza crust', 'Marinara sauce', 'Buffalo mozzarella', 'Fresh basil & Cherry tomatoes']
    };
  } else if (normalized.includes('taco') || normalized.includes('burrito')) {
    customLunch = {
      name: 'Fiesta Taco & Guacamole Board',
      desc: 'Crisp corn tortilla shells stuffed with seasoned protein, shredded lettuce, pico de gallo, and cotija cheese, with homemade guacamole.',
      cost: 195,
      ingredients: ['Taco shells', 'Seasoned protein (Chicken/Beans)', 'Pico de gallo', 'Fresh avocados', 'Cotija cheese']
    };
  } else if (normalized.includes('pasta')) {
    customLunch = {
      name: 'Tuscan Garlic Alfredo Pasta',
      desc: 'Penne pasta tossed in a velvety garlic-parmesan cream sauce, garnished with parsley and cracked black pepper.',
      cost: 180,
      ingredients: ['Penne pasta', 'Parmesan cheese', 'Heavy cream & Garlic', 'Fresh parsley']
    };
  } else if (normalized.includes('biryani')) {
    customLunch = {
      name: 'Aromatic Dum Biryani',
      desc: 'Long-grain basmati rice layered with spiced marinated protein and caramelized onions, slow-cooked under dum pressure.',
      cost: 230,
      ingredients: ['Premium basmati rice', 'Biryani spice blend', 'Marinated protein', 'Caramelized onions']
    };
  }

  if (normalized.includes('soup') || normalized.includes('ramen')) {
    customDinner = {
      name: 'Classic Umami Shoyu Ramen',
      desc: 'Chewy wheat ramen noodles in a savory seasoned soy broth, topped with marinated bamboo shoots, nori, and protein choice.',
      cost: 180,
      ingredients: ['Ramen noodles', 'Umami shoyu broth base', 'Bamboo shoots & Nori', 'Protein topping']
    };
  } else if (normalized.includes('salad')) {
    customDinner = {
      name: 'Med-Style Quinoa Salad Bowl',
      desc: 'Tri-color quinoa, kalamata olives, cucumber, red onions, and crumbled feta cheese dressed in lemon herb vinaigrette.',
      cost: 140,
      ingredients: ['Tri-color quinoa', 'Kalamata olives', 'Feta cheese', 'Cucumber & Onions', 'Lemon herb vinaigrette']
    };
  }

  // Detect general tags if custom overrides not matched
  const isKeto = normalized.includes('keto') || normalized.includes('low-carb') || normalized.includes('carb');
  const isVeg = normalized.includes('veg') || normalized.includes('vegetarian') || normalized.includes('plant');
  const isVegan = normalized.includes('vegan');
  const isIndian = normalized.includes('indian') || normalized.includes('masala') || normalized.includes('curry') || normalized.includes('paneer') || normalized.includes('roti') || normalized.includes('poha');
  const isItalian = normalized.includes('italian') || normalized.includes('pasta') || normalized.includes('pesto') || normalized.includes('pizza');
  const isAsian = normalized.includes('asian') || normalized.includes('chinese') || normalized.includes('japanese') || normalized.includes('tofu') || normalized.includes('noodle') || normalized.includes('shoyu');
  
  // Protein preferences
  let preferredProtein = null;
  if (normalized.includes('chicken')) preferredProtein = 'chicken';
  else if (normalized.includes('salmon') || normalized.includes('fish') || normalized.includes('seafood') || normalized.includes('shrimp')) preferredProtein = 'fish';
  else if (normalized.includes('egg') || normalized.includes('eggs')) preferredProtein = 'eggs';
  else if (normalized.includes('tofu')) preferredProtein = 'tofu';
  else if (normalized.includes('paneer')) preferredProtein = 'paneer';
  else if (normalized.includes('beef') || normalized.includes('steak') || normalized.includes('meat')) preferredProtein = 'beef';

  // --- 1. Synthesize Breakfast ---
  let meal1 = customBreakfast;
  if (!meal1) {
    if (isKeto) {
      if (preferredProtein === 'eggs' || preferredProtein === 'chicken' || !preferredProtein) {
        meal1 = {
          name: 'Avocado & Bacon Baked Egg halves',
          desc: 'Warm avocado boats stuffed with baked eggs, topped with chopped smoked bacon and cheddar.',
          cost: 130,
          ingredients: ['Avocados', 'Bacon slices', 'Eggs', 'Cheddar cheese']
        };
      } else {
        meal1 = {
          name: 'Sesame Garlic Almond Tofu Scramble',
          desc: 'Crumbled tofu scrambled with almond flour, spinach, and roasted sesame oil for a low-carb morning boost.',
          cost: 110,
          ingredients: ['Firm tofu', 'Almond flour', 'Baby spinach', 'Sesame oil']
        };
      }
    } else if (isVegan || (isVeg && !isIndian)) {
      meal1 = {
        name: 'Chia Pudding with Mixed Berries & Almonds',
        desc: 'Soaked chia seeds in soy milk, layered with strawberry puree and crushed almond flakes.',
        cost: 90,
        ingredients: ['Chia seeds', 'Soy milk', 'Strawberries', 'Almonds']
      };
    } else if (isIndian) {
      if (preferredProtein === 'eggs') {
        meal1 = {
          name: 'Spiced Masala Egg Scramble & Pav',
          desc: 'Eggs cooked with minced onions, tomatoes, green chillies, and turmeric, served with toasted butter buns.',
          cost: 85,
          ingredients: ['Eggs', 'Onion & Tomato', 'Green chillies', 'Pav/Buns', 'Butter']
        };
      } else {
        meal1 = {
          name: 'Spiced Poha with Peanuts & Roasted Curry Leaves',
          desc: 'Light, fluffy flattened rice seasoned with mustard seeds, turmeric, peanuts, and fresh cilantro.',
          cost: 70,
          ingredients: ['Flattened rice (Poha)', 'Raw peanuts', 'Curry leaves', 'Mustard seeds']
        };
      }
    } else {
      // Default
      meal1 = {
        name: 'Protein rolled oats with Wild Honey',
        desc: 'Light oats steamed in almond milk, topped with honey, sliced bananas, and organic protein powder.',
        cost: 110,
        ingredients: ['Rolled oats', 'Almond milk', 'Honey', 'Bananas', 'Protein powder']
      };
    }
  }

  // --- 2. Synthesize Lunch ---
  let meal2 = customLunch;
  if (!meal2) {
    if (isKeto) {
      if (preferredProtein === 'fish') {
        meal2 = {
          name: 'Herb Crusted Salmon & Asparagus spears',
          desc: 'Fresh salmon fillet baked with dill oil, served with roasted garlic baby asparagus.',
          cost: 250,
          ingredients: ['Salmon fillet', 'Dill oil', 'Asparagus spears', 'Garlic']
        };
      } else if (preferredProtein === 'chicken') {
        meal2 = {
          name: 'Tender Garlic Butter Chicken & Broccoli',
          desc: 'Pan-seared chicken breast slices simmered in garlic butter broth, served with broccoli florets.',
          cost: 195,
          ingredients: ['Chicken breast', 'Garlic butter', 'Broccoli']
        };
      } else if (preferredProtein === 'beef') {
        meal2 = {
          name: 'Pan-Seared Ribeye Steak & Cauliflower Mash',
          desc: 'Thick cut steak seared in butter, thyme, and garlic, served alongside whipped cauliflower cream.',
          cost: 320,
          ingredients: ['Ribeye steak', 'Thyme & Garlic', 'Cauliflower', 'Heavy cream']
        };
      } else {
        meal2 = {
          name: 'Keto Grilled Paneer / Tofu Salad Bowl',
          desc: 'Herb-marinated paneer or tofu chunks grilled and served over a bed of spinach, cucumber, and olive oil.',
          cost: 160,
          ingredients: ['Paneer or Tofu', 'Baby spinach', 'Cucumber', 'Cold-pressed olive oil']
        };
      }
    } else if (isIndian) {
      if (preferredProtein === 'chicken') {
        meal2 = {
          name: 'Spicy Chicken Tikka Masala & Basmati Rice',
          desc: 'Aromatic roasted chicken chunks in a rich spiced tomato curry, served with steamed long-grain basmati rice.',
          cost: 195,
          ingredients: ['Chicken breast', 'Tikka curry paste', 'Cream', 'Basmati rice']
        };
      } else if (preferredProtein === 'fish') {
        meal2 = {
          name: 'Goan Fish Curry & Brown Rice',
          desc: 'Tender fish pieces simmered in a spiced coconut milk gravy, served with steamed unpolished brown rice.',
          cost: 210,
          ingredients: ['White fish fillets', 'Coconut milk', 'Goan spices', 'Brown rice']
        };
      } else {
        meal2 = {
          name: 'Shahi Paneer Butter Masala & Roti',
          desc: 'Soft cottage cheese cubes cooked in a rich, buttery onion-tomato gravy, served with hot wheat rotis.',
          cost: 170,
          ingredients: ['Paneer (Cottage cheese)', 'Tomato gravy & Cream', 'Butter', 'Whole wheat roti']
        };
      }
    } else if (isItalian) {
      if (preferredProtein === 'chicken') {
        meal2 = {
          name: 'Tuscan Garlic Chicken Pasta',
          desc: 'Juicy chicken breast strips, sun-dried tomatoes, and spinach tossed with penne pasta in a light parmesan cream.',
          cost: 195,
          ingredients: ['Chicken strips', 'Sun-dried tomatoes', 'Penne pasta', 'Parmesan cream']
        };
      } else {
        meal2 = {
          name: 'Creamy Pesto Pasta with Pine Nuts',
          desc: 'Penne pasta tossed in a fragrant homemade basil pesto sauce, topped with pine nuts and cherry tomatoes.',
          cost: 155,
          ingredients: ['Penne pasta', 'Basil pesto', 'Pine nuts', 'Cherry tomatoes']
        };
      }
    } else if (isAsian) {
      if (preferredProtein === 'chicken') {
        meal2 = {
          name: 'Teriyaki Chicken Stir-Fry & Jasmine Rice',
          desc: 'Tender chicken thighs wok-tossed in sweet teriyaki glaze with bell peppers, served over steamed jasmine rice.',
          cost: 175,
          ingredients: ['Chicken thigh', 'Teriyaki glaze', 'Bell peppers', 'Jasmine rice']
        };
      } else {
        meal2 = {
          name: 'Sesame Ginger Tofu & Stir-fried Noodles',
          desc: 'Sesame and soy wok-tossed crispy tofu stir-fried with broccoli florets, cabbage, and wheat noodles.',
          cost: 145,
          ingredients: ['Firm tofu', 'Sesame-ginger sauce', 'Broccoli & Cabbage', 'Wheat noodles']
        };
      }
    } else {
      // Default / general non-specific
      let proteinName = 'Chicken Breast';
      let ingredientsList = ['Chicken breast', 'Saffron spices', 'Broccoli', 'Long-grain rice'];
      if (isVeg || isVegan) {
        proteinName = 'Spiced Chickpea & Hummus';
        ingredientsList = ['Chickpeas', 'Hummus', 'Broccoli', 'Quinoa grains'];
      }
      meal2 = {
        name: `${proteinName} & Saffron Rice Bowl`,
        desc: `Freshly prepared seasoned ${proteinName.toLowerCase()} served on saffron long-grain rice with steamed broccoli.`,
        cost: 190,
        ingredients: ingredientsList
      };
    }
  }

  // --- 3. Synthesize Dinner ---
  let meal3 = customDinner;
  if (!meal3) {
    if (isKeto) {
      meal3 = {
        name: 'Garlic Butter Tofu & Broccoli Scramble',
        desc: 'Pan-seared extra firm tofu chunks scrambled with broccoli florets in grass-fed garlic butter.',
        cost: 115,
        ingredients: ['Extra firm tofu', 'Broccoli florets', 'Grass-fed butter', 'Garlic cloves']
      };
    } else if (isIndian) {
      if (preferredProtein === 'chicken') {
        meal3 = {
          name: 'Spiced Chicken Keema Wrap',
          desc: 'Minced chicken cooked with aromatic spices, rolled in a whole wheat tortilla wrap with mint chutney.',
          cost: 140,
          ingredients: ['Chicken keema', 'Aromatic spices', 'Wheat tortilla wrap', 'Mint chutney']
        };
      } else if (preferredProtein === 'eggs') {
        meal3 = {
          name: 'Home-Style Egg Curry & Rice',
          desc: 'Hard-boiled eggs simmered in a spiced onion-tomato gravy, served with a side of steamed rice.',
          cost: 120,
          ingredients: ['Boiled eggs', 'Onion-tomato gravy', 'Steamed rice']
        };
      } else {
        meal3 = {
          name: 'Tofu Bhurji & Whole Wheat Roti',
          desc: 'Crumbled organic tofu sauteed with onions, green chilies, tomatoes, and fresh coriander, with soft wheat roti.',
          cost: 85,
          ingredients: ['Organic tofu', 'Onion & Tomato', 'Green chilies & Coriander', 'Whole wheat roti']
        };
      }
    } else if (isVegan || isVeg) {
      meal3 = {
        name: 'Roasted Butternut Squash & Lentil Soup',
        desc: 'Creamy roasted squash blended with yellow lentils, celery, and vegetable broth, served with a side toast.',
        cost: 110,
        ingredients: ['Butternut squash', 'Yellow lentils', 'Celery', 'Vegetable broth', 'Sourdough toast']
      };
    } else {
      // Default
      meal3 = {
        name: 'Spiced Egg Scramble & Spinach Sourdough',
        desc: 'Fluffy scramble cooked with baby spinach, fresh cottage cheese, and toasted sourdough slice.',
        cost: 125,
        ingredients: ['Eggs', 'Baby spinach', 'Cottage cheese', 'Sourdough slice']
      };
    }
  }

  // Finalize details
  meal1.type = meal1.type || 'Epicure-Breakfast';
  meal2.type = meal2.type || 'Epicure-Lunch';
  meal3.type = meal3.type || 'Epicure-Dinner';

  // Adjust cost values dynamic to budget input (scaling to match realistic bounds)
  const baseTotal = meal1.cost + meal2.cost + meal3.cost;
  if (userBudget < baseTotal && userBudget >= 150) {
    const scaleFactor = (userBudget - 20) / baseTotal;
    meal1.cost = Math.max(40, Math.floor(meal1.cost * scaleFactor));
    meal2.cost = Math.max(60, Math.floor(meal2.cost * scaleFactor));
    meal3.cost = Math.max(40, Math.floor(meal3.cost * scaleFactor));
  } else if (userBudget > baseTotal * 1.5) {
    // Elevate cost and ingredients premium factor
    meal1.cost += 40;
    meal2.cost += 90;
    meal3.cost += 30;
    if (!meal1.name.startsWith('Gourmet') && !meal1.name.startsWith('Premium') && !meal1.name.startsWith('Artisan')) {
      meal1.name = 'Premium ' + meal1.name;
    }
    if (!meal2.name.startsWith('Gourmet') && !meal2.name.startsWith('Premium') && !meal2.name.startsWith('Artisan')) {
      meal2.name = 'Gourmet ' + meal2.name;
    }
    if (!meal3.name.startsWith('Gourmet') && !meal3.name.startsWith('Premium') && !meal3.name.startsWith('Artisan')) {
      meal3.name = 'Artisan ' + meal3.name;
    }
  }

  // Compile unique grocery items based on actual meals
  const rawGrocery = [];
  [meal1, meal2, meal3].forEach(m => {
    if (m.ingredients) {
      m.ingredients.forEach(ing => rawGrocery.push(ing));
    }
  });

  // Unique ingredients
  const uniqueIngredients = [...new Set(rawGrocery)];
  const grocery = uniqueIngredients.map((item, idx) => {
    // Assign generic quantities for realism
    let qty = '200g';
    if (item.toLowerCase().includes('egg')) qty = '4 eggs';
    else if (item.toLowerCase().includes('avocado')) qty = '2 units';
    else if (item.toLowerCase().includes('milk') || item.toLowerCase().includes('cream')) qty = '250ml';
    else if (item.toLowerCase().includes('oil') || item.toLowerCase().includes('butter')) qty = '50g';
    else if (item.toLowerCase().includes('bread') || item.toLowerCase().includes('roti') || item.toLowerCase().includes('naan')) qty = '1 pack';
    else if (item.toLowerCase().includes('spinach') || item.toLowerCase().includes('spices') || item.toLowerCase().includes('garlic')) qty = '1 bunch';
    else if (item.toLowerCase().includes('chicken') || item.toLowerCase().includes('steak') || item.toLowerCase().includes('salmon') || item.toLowerCase().includes('fish')) qty = '300g';
    return { name: item, qty: qty };
  });

  // Generate customized milestones
  const tasks = [
    `Sanitize, prep, and portion raw ingredients: ${uniqueIngredients.slice(0, 3).join(', ')}`,
    `Execute cooking steps for breakfast (${meal1.name})`,
    `Prepare and season lunch components: cook the base grains or proteins`,
    `Assemble dinner (${meal3.name}) and check final temperature controls`,
    `Log final macro estimates and ensure serving is under ₹${meal1.cost + meal2.cost + meal3.cost} budget threshold`
  ];

  // Dynamic substitutions based on what's in the menu
  const substitutions = [];
  if (normalized.includes('chicken') || normalized.includes('steak') || normalized.includes('fish') || normalized.includes('bacon')) {
    substitutions.push({ original: 'Animal Protein (Chicken/Bacon/Salmon)', replacement: 'Organic Firm Tofu / Seitan Strips' });
  }
  if (normalized.includes('paneer') || normalized.includes('butter') || normalized.includes('cheese') || normalized.includes('cream')) {
    substitutions.push({ original: 'Dairy Products (Paneer/Cheese/Butter)', replacement: 'Vegan Cashew Cheese / Coconut Oil' });
  }
  if (normalized.includes('rice') || normalized.includes('pasta') || normalized.includes('naan') || normalized.includes('bread')) {
    substitutions.push({ original: 'Refined Carbs (Rice/Pasta/Bread)', replacement: 'Cauliflower Rice / Zucchini Noodles / Lettuce wraps' });
  }
  // Add defaults if none matched
  if (substitutions.length === 0) {
    substitutions.push({ original: 'Refined Carbs / White Rice', replacement: 'Quinoa / Cauliflower Rice (Low Carb)' });
    substitutions.push({ original: 'Regular Butter / Cream', replacement: 'Extra-virgin Olive oil / Almond milk' });
  }

  return {
    meals: [
      { type: 'Epicure-Breakfast', name: meal1.name, desc: meal1.desc, cost: meal1.cost },
      { type: 'Epicure-Lunch', name: meal2.name, desc: meal2.desc, cost: meal2.cost },
      { type: 'Epicure-Dinner', name: meal3.name, desc: meal3.desc, cost: meal3.cost },
    ],
    tasks: tasks,
    grocery: grocery,
    substitutions: substitutions
  };
}

// Initialize Lucide Icons
lucide.createIcons();

// Sidebar tab switches
sidebarLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const tabName = link.getAttribute('data-tab');
    
    sidebarLinks.forEach(l => l.classList.remove('active'));
    link.classList.add('active');
    
    viewPanes.forEach(pane => {
      pane.classList.remove('active');
      if (pane.id === paneIdMap[tabName]) {
        pane.classList.add('active');
      }
    });

    // Update Header Breadcrumbs
    const headerTitle = document.querySelector('.workspace-header h2');
    const breadcrumb = document.querySelector('.breadcrumbs');
    if (tabName === 'navDash') {
      headerTitle.textContent = 'Orchestrator Console';
      breadcrumb.textContent = 'Home / Orchestrator';
    } else if (tabName === 'navSim') {
      headerTitle.textContent = 'Simulator Console';
      breadcrumb.textContent = 'Home / Simulation';
    } else if (tabName === 'navBill') {
      headerTitle.textContent = 'Payment & Billing';
      breadcrumb.textContent = 'Home / Upgrade';
    }
  });
});

const paneIdMap = {
  navDash: 'paneDash',
  navSim: 'paneSim',
  navBill: 'paneBill'
};

// Inner dashboard output tabs
workspaceTabs.forEach(btn => {
  btn.addEventListener('click', () => {
    const target = btn.getAttribute('data-target');
    workspaceTabs.forEach(t => t.classList.remove('active'));
    workspacePanes.forEach(p => p.classList.remove('active'));
    
    btn.classList.add('active');
    document.getElementById(target).classList.add('active');
  });
});

// Quick-upgrade trigger shortcuts
headerUpgradeBtn.addEventListener('click', () => {
  document.querySelector('[data-tab="navBill"]').click();
});

// Video Simulation controls
let telemetryInterval;
playBtnOverlay.addEventListener('click', toggleVideoPlayback);
btnPlayPause.addEventListener('click', toggleVideoPlayback);

// Add file input listener for local video
if (localVideoFile) {
  localVideoFile.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      
      // Update video source
      simVideo.src = url;
      
      // Remove any <source> child nodes so the video loads the new src directly
      const sources = simVideo.getElementsByTagName('source');
      while (sources.length > 0) {
        sources[0].parentNode.removeChild(sources[0]);
      }
      
      simVideo.load();
      
      // Autoplay
      simVideo.play().then(() => {
        playBtnOverlay.classList.add('inactive');
        btnPlayPause.innerHTML = '<i data-lucide="pause"></i> Pause';
        lucide.createIcons();
        startTelemetryTimer();
      }).catch(err => {
        console.warn("Autoplay failed after loading local file", err);
      });
    }
  });
}

function toggleVideoPlayback() {
  if (simVideo.paused) {
    simVideo.play().then(() => {
      playBtnOverlay.classList.add('inactive');
      btnPlayPause.innerHTML = '<i data-lucide="pause"></i> Pause';
      lucide.createIcons();
      startTelemetryTimer();
    }).catch(e => {
      console.warn("Local video play blocked or missing", e);
      // Fallback: simulate timer anyway to show UI feedback
      startTelemetryTimer();
    });
  } else {
    simVideo.pause();
    btnPlayPause.innerHTML = '<i data-lucide="play"></i> Play';
    lucide.createIcons();
    clearInterval(telemetryInterval);
  }
}

btnMute.addEventListener('click', () => {
  simVideo.muted = !simVideo.muted;
  btnMute.innerHTML = simVideo.muted ? 
    '<i data-lucide="volume-x"></i> Unmute' : 
    '<i data-lucide="volume-2"></i> Mute';
  lucide.createIcons();
});

btnReset.addEventListener('click', () => {
  simVideo.currentTime = 0;
  if (simVideo.paused) {
    toggleVideoPlayback();
  }
});

function startTelemetryTimer() {
  clearInterval(telemetryInterval);
  let seconds = 0;
  telemetryInterval = setInterval(() => {
    seconds++;
    const hrs = String(Math.floor(seconds / 3600)).padStart(2, '0');
    const mins = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
    const secs = String(seconds % 60).padStart(2, '0');
    telemetryTimer.textContent = `${hrs}:${mins}:${secs}`;
  }, 1000);
}

// Payment/Billing integration checkout protocol (Razorpay Simulation)
checkoutPremiumBtn.addEventListener('click', () => {
  const options = {
    key: 'rzp_test_T0n4Vjd6csVHk6', // Injected from credentials list
    amount: 29900, // INR 299 in paisa
    currency: 'INR',
    name: 'Epicure AI',
    description: 'Upgrade to Elite Gastronomy Protocol',
    handler: function (response) {
      alert(`Payment Succeeded! ID: ${response.razorpay_payment_id}`);
      // Elevate User tier visually
      document.querySelector('.user-badge').textContent = 'Elite Active';
      document.querySelector('.user-badge').style.color = '#ffb703';
      checkoutPremiumBtn.textContent = 'Elite Active';
      checkoutPremiumBtn.disabled = true;
    },
    prefill: {
      name: 'Avanish Kasar',
      email: 'avanishkasar57@gmail.com'
    },
    theme: {
      color: '#00e5ff'
    }
  };

  // Simulate payment processing sandbox visually
  const confirmPayment = confirm("Simulate Razorpay checkout transaction of ₹299 for Epicure Elite Tier?");
  if (confirmPayment) {
    const mockPaymentId = 'pay_mock_' + Math.random().toString(36).substring(2, 11);
    options.handler({ razorpay_payment_id: mockPaymentId });
  }
});

// Dynamic form submission verification gates
plannerForm.addEventListener('submit', async (e) => {
  e.preventDefault();

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

  // Swap output views
  welcomeState.classList.remove('active');
  workspaceState.classList.remove('active');
  loaderState.classList.add('active');

  try {
    if (mockModeCheckbox.checked) {
      await new Promise(resolve => setTimeout(resolve, 1200));
      result = generateDynamicPlan(userContext.value, budget);
    } else {
      result = await callRealAI(userContext.value, budget);
    }
    renderPlan(result, budget);
  } catch (error) {
    console.error('Plan mapping failed', error);
    result = generateDynamicPlan(userContext.value, budget);
    renderPlan(result, budget);
  }
});

async function callRealAI(context, budget) {
  const response = await fetch('/api/epicure-generate-plan', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ context, budget })
  });
  if (!response.ok) throw new Error('API Execution Error');
  return response.json();
}

function renderPlan(data, userBudget) {
  // Render Meals grid
  mealsGrid.innerHTML = '';
  let totalCost = 0;

  data.meals.forEach(meal => {
    totalCost += meal.cost;
    const card = document.createElement('div');
    card.className = 'meal-card';
    card.innerHTML = `
      <span class="meal-type">${meal.type}</span>
      <h3>${meal.name}</h3>
      <p>${meal.desc}</p>
      <div class="meal-cost">Cost: ₹${meal.cost}</div>
    `;
    mealsGrid.appendChild(card);
  });

  // Verify budget banners
  budgetBanner.className = 'budget-analytics-card';
  if (totalCost <= userBudget) {
    budgetBanner.classList.add('success');
    budgetBannerTitle.textContent = `Budget Check: Feasible (₹${totalCost} / ₹${userBudget})`;
    budgetBannerDesc.textContent = 'Estimated meal structure fits securely inside your configured limits.';
    budgetBannerIcon.setAttribute('data-lucide', 'shield-check');
  } else {
    budgetBanner.classList.add('warning');
    budgetBannerTitle.textContent = `Budget Check: Over Limit (₹${totalCost} / ₹${userBudget})`;
    budgetBannerDesc.textContent = 'Costs exceed user targets. Check substitutions to optimize resource limits.';
    budgetBannerIcon.setAttribute('data-lucide', 'alert-triangle');
  }

  // Render check list
  taskList.innerHTML = '';
  data.tasks.forEach((taskText, idx) => {
    const item = document.createElement('li');
    item.className = 'task-item';
    item.innerHTML = `
      <input type="checkbox" id="task-${idx}" class="task-checkbox">
      <label for="task-${idx}" class="task-text">${taskText}</label>
    `;
    item.querySelector('.task-checkbox').addEventListener('change', (e) => {
      item.classList.toggle('completed', e.target.checked);
    });
    taskList.appendChild(item);
  });

  // Render Groceries
  groceryList.innerHTML = '';
  data.grocery.forEach(g => {
    const item = document.createElement('li');
    item.innerHTML = `<span>${g.name}</span> <span>${g.qty}</span>`;
    groceryList.appendChild(item);
  });

  // Render substitutions
  substitutionList.innerHTML = '';
  data.substitutions.forEach(s => {
    const item = document.createElement('li');
    item.innerHTML = `
      <span class="sub-original">${s.original}</span>
      <span class="sub-replacement">↳ Use ${s.replacement}</span>
    `;
    substitutionList.appendChild(item);
  });

  // Re-generate Lucide Icons
  lucide.createIcons();

  // Swap panels
  loaderState.classList.remove('active');
  workspaceState.classList.add('active');
}
