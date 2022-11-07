class Employ {
  constructor(settings) {
    this.rate = settings.rate;
    this.grade = settings.grade;
    this.side = settings.side;
    this.tasks = [];
  }
  createEmploy() {
    const devGrade = gradeGenetation();
    let devRate = 0;
    const DEVELOPER_GRADES = {
      junior: {grade: "Junior", rate: 12 }, 
      middle: {grade: "Middle", rate: 22 }, 
      signor: {grade: "Signor", rate: 29 }, 
      
    }
    if (devGrade == DEVELOPER_GRADES.junior.grade) {
      devRate = DEVELOPER_GRADES.junior.rate;
    } else if (devGrade == DEVELOPER_GRADES.middle.grade) {
      devRate = DEVELOPER_GRADES.middle.rate;
    } else {
      devRate = DEVELOPER_GRADES.signor.rate;
    }

    this.rate = devRate;
    this.grade = devGrade;

    return this;
  }
}

class FrontendDeveloper extends Employ {
  constructor() {
    super({
      side: "Front",
    });
  }
}

class BackendDeveloper extends Employ {
  constructor() {
    super({
      side: 'Back',
    });
  }
}

class Customer {
  constructor() {
    this.projectSettings = [];
  }
  createProject() {
    const numberOfTasks = randomGeneration(1, 6);
    for (let i = 1; i < numberOfTasks; i++) {
      const task = {
        description: `Task ${i}`,
        side: sideGenetation(),
        estimate: randomGeneration(1, 30),
      };

      this.projectSettings.push(task);
    }

    return this.projectSettings;
  }
}

class ItCompany {
  employees = [];

  hireEmployees() {
    const devs = randomGeneration(1, 3);
  
    for (let i = 0; i < devs; i++) {
      const frontEmploy = new FrontendDeveloper();
      let frontCreation = frontEmploy.createEmploy();
      this.employees.push(frontCreation);
    }

    for (let i = 0; i < devs; i++) {
      const backEmploy = new BackendDeveloper();
      let backCreation = backEmploy.createEmploy();
      this.employees.push(backCreation);
    }
   
  }

  calculateProjectImplementation(project) {
    console.log("project :>> ", project);
    console.log("this.employees :>> ", this.employees);
    const assignTask = project.map((task, index) => {
      const indexOfTask = 0;
      this.employees.forEach((employ) => {
        if (task.side === employ.side) {
          indexOfTask = index + 1;
          employ.tasks.push(indexOfTask);
          return;
        }
      });
    });
    console.log(" this.employees :>> ", this.employees);

    let estimation = 0;

    const employCfg = this.employees.map((employ) => {
      let sum = 0;

      employ.tasks.forEach((task) => {
        sum = task.estimate + sum;
      });

      if (employ.grade === "Junior") {
        sum = sum * 1.5 * 12;
      }
      if (employ.grade === "Middle") {
        sum = sum * 1.3 * 22;
      }
      if (employ.grade === "Signor") {
        sum = sum * 29;
      }
      estimation = sum + estimation;
    });

    let numberOfDays = 0;
    const employCfgg = this.employees.map((employ) => {
      let daySum = 0;

      employ.tasks.forEach((task) => {
        daySum = task.estimate + daySum;
      });

      if (employ.grade === "Junior") {
        daySum = (daySum * 1.5) / 8;
      }
      if (employ.grade === "Middle") {
        daySum = (daySum * 1.3) / 8;
      }
      if (employ.grade === "Signor") {
        daySum = daySum / 8;
      }

      numberOfDays = daySum + numberOfDays;
    });

    //  console.log("numberOfDays-", numberOfDays, );
  }
}

const randomGeneration = (max, min) => {
  return Math.floor(Math.random() * (max - min)) + min;
};

const randomBoolean = () => {
  return Math.random() < 0.5;
};

const gradeGenetation = () => {
  const grades = ["Junior", "Middle", "Signor"];
  const randomGrade = randomGeneration(3, 0);
  return grades[randomGrade];
};

const sideGenetation = () => {
  const sides = ["Back", "Front"];
  const randomSide = randomGeneration(2, 0);
  return sides[randomSide];
};

const itCompany = new ItCompany();
itCompany.hireEmployees();
const project = new Customer();
project.createProject();
const resultOfProjectImplementation = itCompany.calculateProjectImplementation(
  project.projectSettings
);
