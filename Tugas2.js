// 1. CREATE DATABASE (insertOne & insertMany)
USE university;

db.createCollection("courses");

db.courses.insertOne({
  course_name: "Machine Learning Fundamentals",
  instructor: "David",
  year: 2023,
  category: "Computer Science"
});

db.courses.insertMany([
  {
    course_name: "Web Development Basics",
    instructor: "Sarah",
    year: 2024,
    category: "Computer Science"
  },
  {
    course_name: "Literature Analysis",
    instructor: "Michael",
    year: 2022,
    category: "Humanities"
  }
]);

// 2. READ DOCUMENT (find)
db.courses.find(); 
db.courses.find({ instructor: "David" }); 

// 3. UPDATE DOCUMENT (updateOne)
db.courses.updateOne(
  { course_name: "Machine Learning Fundamentals" },
  { $set: { year: 2025 } }
);

// 4. DELETE DOCUMENT (deleteOne)
db.courses.deleteOne({ course_name: "Literature Analysis" });

// 5. COMPARISON QUERY
db.courses.find({ year: { $gt: 2022 } }); 

// 6. LOGICAL QUERY
db.courses.find({
  $or: [
    { category: "Computer Science" },
    { instructor: "Michael" }
  ]
});

// 7. BULK WRITE
db.courses.bulkWrite([
  {
    insertOne: {
      document: {
        course_name: "Data Visualization",
        instructor: "Lina",
        year: 2021,
        category: "Computer Science"
      }
    }
  },
  {
    updateOne: {
      filter: { course_name: "Web Development Basics" },
      update: { $set: { year: 2025 } }
    }
  },
  {
    deleteOne: {
      filter: { course_name: "Data Visualization" }
    }
  }
]);

// 8. AGGREGATION (count jumlah kursus Computer Science)
db.courses.aggregate([
  { $match: { category: "Computer Science" } },
  { $count: "total_cs_courses" }
]);

// 9. SCHEMA VALIDATION
db.createCollection("validated_courses", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["course_name", "instructor", "year", "category"],
      properties: {
        course_name: {
          bsonType: "string",
          description: "Nama kursus harus berupa string dan wajib diisi"
        },
        instructor: {
          bsonType: "string",
          description: "Instruktur harus berupa string dan wajib diisi"
        },
        year: {
          bsonType: "int",
          minimum: 2000,
          maximum: 2100,
          description: "Tahun harus berupa angka antara 2000 - 2100"
        },
        category: {
          bsonType: "string",
          description: "Kategori harus berupa string dan wajib diisi"
        }
      }
    }
  },
  validationLevel: "strict",
  validationAction: "error"
});

// Contoh insert yang gagal karena tahun bukan integer
db.validated_courses.insertOne({
  course_name: "Cybersecurity Essentials",
  instructor: "Nina",
  year: "2024", /// (Salah karena string)
  category: "Computer Science"
});

// Contoh insert yang valid
db.validated_courses.insertOne({
  course_name: "Cloud Computing",
  instructor: "Rafi",
  year: 2023,
  category: "Computer Science"
});
