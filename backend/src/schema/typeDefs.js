// backend/src/schema/typeDefs.js

const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Student {
    id: ID!
    studentNumber: String!
    firstName: String!
    lastName: String!
    address: String!
    city: String!
    phoneNumber: String!
    email: String!
    program: String!
    courses: [Course]
  }

  type Course {
    id: ID!
    courseCode: String!
    courseName: String!
    section: String!
    semester: String!
    students: [Student]
  }

  type AuthPayload {
    token: String!
    student: Student
  }
  # Queries
  type Query {
    students: [Student]
    student(id: ID!): Student
    courses: [Course]
    course(id: ID!): Course
    studentsInCourse(courseCode: String!): [Student]

  }

  # Mutations
  type Mutation {
    registerStudent(
      studentNumber: String!,
      password: String!,
      firstName: String!,
      lastName: String!,
      address: String!,
      city: String!,
      phoneNumber: String!,
      email: String!,
      program: String!
    ): Student

    signup(
      studentNumber: String!,
      password: String!,
      firstName: String!,
      lastName: String!,
      address: String!,
      city: String!,
      phoneNumber: String!,
      email: String!,
      program: String!
    ): AuthPayload

    login(email: String!, password: String!): AuthPayload

    updateStudent(
      studentNumber: String!,
      firstName: String,
      lastName: String,
      address: String,
      city: String,
      phoneNumber: String,
      email: String,
      program: String
    ): Student

    addCourse(
      courseCode: String!,
      courseName: String!,
      section: String!,
      semester: String!
      studentId: ID!
    ): Course

    updateCourse(
      id: ID!,
      courseCode: String,
      courseName: String,
      section: String,
      semester: String
    ): Course

    deleteCourse(id: ID!): String
  }
`;

module.exports = typeDefs;
