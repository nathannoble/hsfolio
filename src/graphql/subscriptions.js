// eslint-disable
// this is an auto generated file. This will be overwritten

export const onCreateSchool = `subscription OnCreateSchool {
  onCreateSchool {
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
export const onUpdateSchool = `subscription OnUpdateSchool {
  onUpdateSchool {
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
export const onDeleteSchool = `subscription OnDeleteSchool {
  onDeleteSchool {
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
export const onCreateSchoolYear = `subscription OnCreateSchoolYear {
  onCreateSchoolYear {
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
export const onUpdateSchoolYear = `subscription OnUpdateSchoolYear {
  onUpdateSchoolYear {
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
export const onDeleteSchoolYear = `subscription OnDeleteSchoolYear {
  onDeleteSchoolYear {
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
export const onCreateStudent = `subscription OnCreateStudent {
  onCreateStudent {
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
export const onUpdateStudent = `subscription OnUpdateStudent {
  onUpdateStudent {
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
export const onDeleteStudent = `subscription OnDeleteStudent {
  onDeleteStudent {
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
export const onCreateSubject = `subscription OnCreateSubject {
  onCreateSubject {
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
export const onUpdateSubject = `subscription OnUpdateSubject {
  onUpdateSubject {
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
export const onDeleteSubject = `subscription OnDeleteSubject {
  onDeleteSubject {
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
export const onCreateTask = `subscription OnCreateTask {
  onCreateTask {
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
export const onUpdateTask = `subscription OnUpdateTask {
  onUpdateTask {
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
export const onDeleteTask = `subscription OnDeleteTask {
  onDeleteTask {
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
export const onCreateTaskWork = `subscription OnCreateTaskWork {
  onCreateTaskWork {
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
export const onUpdateTaskWork = `subscription OnUpdateTaskWork {
  onUpdateTaskWork {
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
export const onDeleteTaskWork = `subscription OnDeleteTaskWork {
  onDeleteTaskWork {
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
export const onCreatePrivateNote = `subscription OnCreatePrivateNote {
  onCreatePrivateNote {
    id
    content
  }
}
`;
export const onUpdatePrivateNote = `subscription OnUpdatePrivateNote {
  onUpdatePrivateNote {
    id
    content
  }
}
`;
export const onDeletePrivateNote = `subscription OnDeletePrivateNote {
  onDeletePrivateNote {
    id
    content
  }
}
`;
