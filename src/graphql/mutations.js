// eslint-disable
// this is an auto generated file. This will be overwritten

export const createSchool = `mutation CreateSchool($input: CreateSchoolInput!) {
  createSchool(input: $input) {
    id
    name
    schoolYears {
      items {
        id
        name
      }
      nextToken
    }
  }
}
`;
export const updateSchool = `mutation UpdateSchool($input: UpdateSchoolInput!) {
  updateSchool(input: $input) {
    id
    name
    schoolYears {
      items {
        id
        name
      }
      nextToken
    }
  }
}
`;
export const deleteSchool = `mutation DeleteSchool($input: DeleteSchoolInput!) {
  deleteSchool(input: $input) {
    id
    name
    schoolYears {
      items {
        id
        name
      }
      nextToken
    }
  }
}
`;
export const createSchoolYear = `mutation CreateSchoolYear($input: CreateSchoolYearInput!) {
  createSchoolYear(input: $input) {
    id
    name
    school {
      id
      name
    }
    students {
      items {
        id
        name
      }
      nextToken
    }
  }
}
`;
export const updateSchoolYear = `mutation UpdateSchoolYear($input: UpdateSchoolYearInput!) {
  updateSchoolYear(input: $input) {
    id
    name
    school {
      id
      name
    }
    students {
      items {
        id
        name
      }
      nextToken
    }
  }
}
`;
export const deleteSchoolYear = `mutation DeleteSchoolYear($input: DeleteSchoolYearInput!) {
  deleteSchoolYear(input: $input) {
    id
    name
    school {
      id
      name
    }
    students {
      items {
        id
        name
      }
      nextToken
    }
  }
}
`;
export const createStudent = `mutation CreateStudent($input: CreateStudentInput!) {
  createStudent(input: $input) {
    id
    name
    schoolYear {
      id
      name
    }
    subjects {
      items {
        id
        name
        level
        grade
      }
      nextToken
    }
  }
}
`;
export const updateStudent = `mutation UpdateStudent($input: UpdateStudentInput!) {
  updateStudent(input: $input) {
    id
    name
    schoolYear {
      id
      name
    }
    subjects {
      items {
        id
        name
        level
        grade
      }
      nextToken
    }
  }
}
`;
export const deleteStudent = `mutation DeleteStudent($input: DeleteStudentInput!) {
  deleteStudent(input: $input) {
    id
    name
    schoolYear {
      id
      name
    }
    subjects {
      items {
        id
        name
        level
        grade
      }
      nextToken
    }
  }
}
`;
export const createSubject = `mutation CreateSubject($input: CreateSubjectInput!) {
  createSubject(input: $input) {
    id
    name
    level
    student {
      id
      name
    }
    tasks {
      items {
        id
        title
        description
        status
      }
      nextToken
    }
    grade
  }
}
`;
export const updateSubject = `mutation UpdateSubject($input: UpdateSubjectInput!) {
  updateSubject(input: $input) {
    id
    name
    level
    student {
      id
      name
    }
    tasks {
      items {
        id
        title
        description
        status
      }
      nextToken
    }
    grade
  }
}
`;
export const deleteSubject = `mutation DeleteSubject($input: DeleteSubjectInput!) {
  deleteSubject(input: $input) {
    id
    name
    level
    student {
      id
      name
    }
    tasks {
      items {
        id
        title
        description
        status
      }
      nextToken
    }
    grade
  }
}
`;
export const createTask = `mutation CreateTask($input: CreateTaskInput!) {
  createTask(input: $input) {
    id
    title
    description
    status
    subject {
      id
      name
      level
      grade
    }
    taskWork {
      id
      comment
      attachments
    }
  }
}
`;
export const updateTask = `mutation UpdateTask($input: UpdateTaskInput!) {
  updateTask(input: $input) {
    id
    title
    description
    status
    subject {
      id
      name
      level
      grade
    }
    taskWork {
      id
      comment
      attachments
    }
  }
}
`;
export const deleteTask = `mutation DeleteTask($input: DeleteTaskInput!) {
  deleteTask(input: $input) {
    id
    title
    description
    status
    subject {
      id
      name
      level
      grade
    }
    taskWork {
      id
      comment
      attachments
    }
  }
}
`;
export const createTaskWork = `mutation CreateTaskWork($input: CreateTaskWorkInput!) {
  createTaskWork(input: $input) {
    id
    task {
      id
      title
      description
      status
    }
    comment
    attachments
  }
}
`;
export const updateTaskWork = `mutation UpdateTaskWork($input: UpdateTaskWorkInput!) {
  updateTaskWork(input: $input) {
    id
    task {
      id
      title
      description
      status
    }
    comment
    attachments
  }
}
`;
export const deleteTaskWork = `mutation DeleteTaskWork($input: DeleteTaskWorkInput!) {
  deleteTaskWork(input: $input) {
    id
    task {
      id
      title
      description
      status
    }
    comment
    attachments
  }
}
`;
export const createPrivateNote = `mutation CreatePrivateNote($input: CreatePrivateNoteInput!) {
  createPrivateNote(input: $input) {
    id
    content
  }
}
`;
export const updatePrivateNote = `mutation UpdatePrivateNote($input: UpdatePrivateNoteInput!) {
  updatePrivateNote(input: $input) {
    id
    content
  }
}
`;
export const deletePrivateNote = `mutation DeletePrivateNote($input: DeletePrivateNoteInput!) {
  deletePrivateNote(input: $input) {
    id
    content
  }
}
`;
