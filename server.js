const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 8080;

// Enable JSON body parsing middleware
app.use(express.json());
app.use(express.static(__dirname));

// Live API Endpoint supporting server-side culinary planning
app.post('/api/epicure-generate-plan', (req, res) => {
  const { context, budget } = req.body;
  if (!context || isNaN(Number(budget))) {
    return res.status(400).json({ error: 'Invalid parameters' });
  }

  const result = generateServerPlan(context, Number(budget));
  res.json(result);
});

// Serve index.html for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Epicure server is running on port ${PORT}`);
});

// Server-side mirror of the planner heuristics
function generateServerPlan(context, userBudget) {
  const normalized = context.toLowerCase();
  let customBreakfast = null;
  let customLunch = null;
  let customDinner = null;

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

  const isKeto = normalized.includes('keto') || normalized.includes('low-carb') || normalized.includes('carb');
  const isVeg = normalized.includes('veg') || normalized.includes('vegetarian') || normalized.includes('plant');
  const isVegan = normalized.includes('vegan');
  const isIndian = normalized.includes('indian') || normalized.includes('masala') || normalized.includes('curry') || normalized.includes('paneer') || normalized.includes('roti') || normalized.includes('poha');
  const isItalian = normalized.includes('italian') || normalized.includes('pasta') || normalized.includes('pesto') || normalized.includes('pizza');
  const isAsian = normalized.includes('asian') || normalized.includes('chinese') || normalized.includes('japanese') || normalized.includes('tofu') || normalized.includes('noodle') || normalized.includes('shoyu');
  
  let preferredProtein = null;
  if (normalized.includes('chicken')) preferredProtein = 'chicken';
  else if (normalized.includes('salmon') || normalized.includes('fish') || normalized.includes('seafood') || normalized.includes('shrimp')) preferredProtein = 'fish';
  else if (normalized.includes('egg') || normalized.includes('eggs')) preferredProtein = 'eggs';
  else if (normalized.includes('tofu')) preferredProtein = 'tofu';
  else if (normalized.includes('paneer')) preferredProtein = 'paneer';
  else if (normalized.includes('beef') || normalized.includes('steak') || normalized.includes('meat')) preferredProtein = 'beef';

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
      meal1 = {
        name: 'Protein rolled oats with Wild Honey',
        desc: 'Light oats steamed in almond milk, topped with honey, sliced bananas, and organic protein powder.',
        cost: 110,
        ingredients: ['Rolled oats', 'Almond milk', 'Honey', 'Bananas', 'Protein powder']
      };
    }
  }

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
      meal3 = {
        name: 'Spiced Egg Scramble & Spinach Sourdough',
        desc: 'Fluffy scramble cooked with baby spinach, fresh cottage cheese, and toasted sourdough slice.',
        cost: 125,
        ingredients: ['Eggs', 'Baby spinach', 'Cottage cheese', 'Sourdough slice']
      };
    }
  }

  meal1.type = 'Epicure-Breakfast';
  meal2.type = 'Epicure-Lunch';
  meal3.type = 'Epicure-Dinner';

  const baseTotal = meal1.cost + meal2.cost + meal3.cost;
  if (userBudget < baseTotal && userBudget >= 150) {
    const scaleFactor = (userBudget - 20) / baseTotal;
    meal1.cost = Math.max(40, Math.floor(meal1.cost * scaleFactor));
    meal2.cost = Math.max(60, Math.floor(meal2.cost * scaleFactor));
    meal3.cost = Math.max(40, Math.floor(meal3.cost * scaleFactor));
  } else if (userBudget > baseTotal * 1.5) {
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

  const rawGrocery = [];
  [meal1, meal2, meal3].forEach(m => {
    if (m.ingredients) {
      m.ingredients.forEach(ing => rawGrocery.push(ing));
    }
  });

  const uniqueIngredients = [...new Set(rawGrocery)];
  const grocery = uniqueIngredients.map((item) => {
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

  const tasks = [
    `Sanitize, prep, and portion raw ingredients: ${uniqueIngredients.slice(0, 3).join(', ')}`,
    `Execute cooking steps for breakfast (${meal1.name})`,
    `Prepare and season lunch components: cook the base grains or proteins`,
    `Assemble dinner (${meal3.name}) and check final temperature controls`,
    `Log final macro estimates and ensure serving is under ₹${meal1.cost + meal2.cost + meal3.cost} budget threshold`
  ];

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
