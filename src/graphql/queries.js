// eslint-disable
// this is an auto generated file. This will be overwritten

export const getSchool = `query GetSchool($id: ID!) {
  getSchool(id: $id) {
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
export const listSchools = `query ListSchools(
  $filter: ModelSchoolFilterInput
  $limit: Int
  $nextToken: String
) {
  listSchools(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
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
    nextToken
  }
}
`;
export const getSchoolYear = `query GetSchoolYear($id: ID!) {
  getSchoolYear(id: $id) {
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
export const listSchoolYears = `query ListSchoolYears(
  $filter: ModelSchoolYearFilterInput
  $limit: Int
  $nextToken: String
) {
  listSchoolYears(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
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
    nextToken
  }
}
`;
export const getStudent = `query GetStudent($id: ID!) {
  getStudent(id: $id) {
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
export const listStudents = `query ListStudents(
  $filter: ModelStudentFilterInput
  $limit: Int
  $nextToken: String
) {
  listStudents(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
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
    nextToken
  }
}
`;
export const getSubject = `query GetSubject($id: ID!) {
  getSubject(id: $id) {
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
export const listSubjects = `query ListSubjects(
  $filter: ModelSubjectFilterInput
  $limit: Int
  $nextToken: String
) {
  listSubjects(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
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
    nextToken
  }
}
`;
export const getTask = `query GetTask($id: ID!) {
  getTask(id: $id) {
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
export const listTasks = `query ListTasks(
  $filter: ModelTaskFilterInput
  $limit: Int
  $nextToken: String
) {
  listTasks(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
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
    nextToken
  }
}
`;
export const getTaskWork = `query GetTaskWork($id: ID!) {
  getTaskWork(id: $id) {
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
export const listTaskWorks = `query ListTaskWorks(
  $filter: ModelTaskWorkFilterInput
  $limit: Int
  $nextToken: String
) {
  listTaskWorks(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
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
    nextToken
  }
}
`;
export const getPrivateNote = `query GetPrivateNote($id: ID!) {
  getPrivateNote(id: $id) {
    id
    content
  }
}
`;
export const listPrivateNotes = `query ListPrivateNotes(
  $filter: ModelPrivateNoteFilterInput
  $limit: Int
  $nextToken: String
) {
  listPrivateNotes(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      content
    }
    nextToken
  }
}
`;
