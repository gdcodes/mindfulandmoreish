# Contentful Setup Guide

For the blog to work, your Contentful space needs a specific content model. This guide will walk you through setting it up.

## 1. Create the Content Model

In your Contentful space, create a new **Content Model** with the following properties:
- **Name**: `Recipe`
- **API Identifier**: `recipe`
- **Description**: `A cooking recipe with ingredients, instructions, and metadata.`

## 2. Add and Configure Fields

Add the following fields to your `Recipe` content model. It is important to match the **Field ID** and **Type** exactly.

| Field Name     | Field ID        | Field Type | Required | Notes & Validations                                                                                         |
| :------------- | :-------------- | :--------- | :------- | :---------------------------------------------------------------------------------------------------------- |
| **Title**      | `title`         | Symbol     | ✅ Yes    | The title of the recipe. Should be unique.                                                                  |
| **Slug**       | `slug`          | Symbol     | ✅ Yes    | URL-friendly slug. Validation regex: `^[a-z0-9]+(?:-[a-z0-9]+)*$`                                           |
| **Prep Time**  | `prepTime`      | Integer    | ✅ Yes    | Preparation time in minutes.                                                                                |
| **Cook Time**  | `cookTime`      | Integer    | ✅ Yes    | Cooking time in minutes.                                                                                    |
| **Cool Time**  | `coolTime`      | Integer    | ◽️ No     | Cooling time in minutes.                                                                                    |
| **Tags**       | `tags`          | Array      | ✅ Yes    | Set **Item type** to `Symbol`. Allows for filtering (e.g., "vegan", "gluten-free").                             |
| **Thumbnail**  | `thumbnail`     | Media      | ◽️ No     | Link to one **Asset**. Set validation to accept only images.                                                |
| **Photos**     | `photos`        | Array      | ◽️ No     | Link to multiple **Assets**. Set validation to accept only images and a max of 5 files.                     |
| **Ingredients**| `ingredients`   | Rich Text  | ✅ Yes    | Recipe ingredients. Standard rich text validations apply.                                                   |
| **Instructions**| `instructions`| Rich Text  | ✅ Yes    | Step-by-step instructions. Standard rich text validations apply.                                            |
| **Tips**       | `tips`          | Rich Text  | ◽️ No     | Optional tips and tricks. Standard rich text validations apply.                                             |
| **Shelf Life** | `shelfLife`     | Integer    | ✅ Yes    | How many days the dish stays fresh at room temperature.                                                     |
| **Fridge Life**| `fridgeLife`    | Integer    | ◽️ No     | How many days the dish stays fresh in the fridge.                                                           |
| **Freezer Life**| `freezerLife` | Integer    | ◽️ No     | How many days the dish stays fresh in the freezer.                                                          |

## 3. Create and Publish Recipes

Once your content model is set up, create a few sample recipes and make sure to **publish** them so they are available via the API. 