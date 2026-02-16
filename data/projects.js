const mongoose = require("mongoose");

// 1. The Blueprint: Define fields and types
const projectSchema = new mongoose.Schema({
    slug: { type: String, required: true, unique: true },
    title: String,
    description: String,
    isActive: Boolean,
});

// 2. The Model: The constructor used to interact with the collection
const Project = mongoose.model("Project", projectSchema);

// 3. The Operations: Helper methods
class ProjectOps {

    // 1. Get all active projects
    // async getProjectList() {
    //     // Similar to mongosh: returns all documents matching the criteria
    //     return await Project.find({ isActive: true });
    //   }


    // 2. Get all active projects filtered by title
    // async getProjectList(titleContains = null) {
    //     const filter = { isActive: true };

    //     if (titleContains) {
    //         // We'll see how to make this "fuzzy" in the next lesson.
    //         // For now, it's an exact match on the title.
    //         filter.title = titleContains;
    //     }

    //     return await Project.find(filter);
    // }

    // 3. Get all active projects filtered by title or description (fuzzy search)
    async getProjectList(searchTerm = null) {
        let filter = { isActive: true };

        if (searchTerm) {
            // Check both fields using the $or operator and case-insensitive regex
            filter.$or = [
                { title: { $regex: searchTerm, $options: 'i' } },
                { description: { $regex: searchTerm, $options: 'i' } }
            ];
        }

        return await Project.find(filter);
    }


    async getProjectBySlug(slug) {
        // We use findOne because we are searching by a custom field (slug)
        return await Project.findOne({ slug: slug, isActive: true });
    }
}

module.exports = new ProjectOps();
