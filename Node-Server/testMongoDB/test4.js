var db = connect('liuyanben');
db.students.update({
  'grades': 70
}, {
    $set: { 'grades.$': 82 }
  });