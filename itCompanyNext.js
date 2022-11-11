class Employ {
  constructor(settings) {
    this.rate = settings.rate;
    this.grade = settings.grade;
    this.side = settings.side;
    this.tasks = [];
  }

  createEmploy() {
    const devGrade = Util.gradeGenetation();
    let devRate = 0;
    const DEVELOPER_GRADES = {
      junior: { grade: "Junior", rate: 12 },
      middle: { grade: "Middle", rate: 22 },
      signor: { grade: "Signor", rate: 29 },
    };
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
      side: "Back",
    });
  }
}

class Customer {
  constructor() {
    this.projectSettings = [];
  }
  createProject() {
    const RANDOM_GENERATION_TASK_SETTINGS = { min: 1, max: 10 };
    const RANDOM_GENERATION_ESTIMATION_SETTINGS = { min: 1, max: 30 };
    const numberOfTasks = Util.randomGeneration(
      RANDOM_GENERATION_TASK_SETTINGS.min,
      RANDOM_GENERATION_TASK_SETTINGS.max
    );

    const numberOfTaskArr = Array(numberOfTasks).fill();
    numberOfTaskArr.forEach((number, i) => {
      const task = {
        description: `Task ${i + 1}`,
        side: Util.sideGenetation(),
        estimate: Util.randomGeneration(
          RANDOM_GENERATION_ESTIMATION_SETTINGS.min,
          RANDOM_GENERATION_ESTIMATION_SETTINGS.max
        ),
      };
      this.projectSettings.push(task);
    });

    return this.projectSettings;
  }
}

class ItCompany {
  employees = [];

  hireEmployees() {
    const RANDOM_GENERATION_DEVS = { min: 1, max: 4 };
    const devs = Util.randomGeneration(
      RANDOM_GENERATION_DEVS.min,
      RANDOM_GENERATION_DEVS.max
    );
    const employArr = Array(devs).fill();
    employArr.forEach((employ) => {
      const frontEmploy = new FrontendDeveloper();
      const backEmploy = new BackendDeveloper();
      const frontCreation = frontEmploy.createEmploy();
      const backCreation = backEmploy.createEmploy();
      this.employees.push(frontCreation);
      this.employees.push(backCreation);
    });
  }

  calculateProjectImplementation(project) {
    const DEVELOPER_GRADES = {
      junior: { grade: "Junior", rate: 12, efficiency: 1.5 },
      middle: { grade: "Middle", rate: 22, efficiency: 1.3 },
      signor: { grade: "Signor", rate: 29, efficiency: 1 },
    };

    const findExistTask = (taksId) => {
      const finded = this.employees.find((employ) => {
        return employ.tasks.find((task) => task === taksId);
      });
      return !!finded;
    };

    project.forEach((task, index) => {
      this.employees.forEach((employ) => {
        const finded = findExistTask(index + 1);
        if (
          employ.side === task.side &&
          finded === false &&
          employ.tasks.length === 0
        ) {
          employ.tasks.push(index + 1);
        }
      });
    });

    const projectCost = this.employees.reduce((sumEmploy, employ) => {
      const sumOfTasks = employ.tasks.reduce((sumTask, task) => {
        const findedTask = project.find(
          (item, indexOfTask) => task === indexOfTask + 1
        );

        if (!!findedTask) {
          switch (employ.grade) {
            case DEVELOPER_GRADES.junior.grade:
              sumTask =
                DEVELOPER_GRADES.junior.efficiency *
                DEVELOPER_GRADES.junior.rate *
                findedTask.estimate;
              break;
            case DEVELOPER_GRADES.middle.grade:
              sumTask =
                DEVELOPER_GRADES.middle.efficiency *
                DEVELOPER_GRADES.middle.rate *
                findedTask.estimate;
              break;
            case DEVELOPER_GRADES.signor.grade:
              sumTask =
                DEVELOPER_GRADES.signor.efficiency *
                DEVELOPER_GRADES.signor.rate *
                findedTask.estimate;
              break;
          }
        }
        return sumTask;
      }, 0);
      return sumEmploy + sumOfTasks;
    }, 0);

    const projectEstimation = this.employees.reduce((sumEmploy, employ) => {
      const employEstimate = employ.tasks.reduce((estimate, task) => {
        const findedTask = project.find(
          (item, indexOfTask) => task === indexOfTask + 1
        );

        if (!!findedTask) {
          switch (employ.grade) {
            case DEVELOPER_GRADES.junior.grade:
              estimate =
                DEVELOPER_GRADES.junior.efficiency * findedTask.estimate;
              break;
            case DEVELOPER_GRADES.middle.grade:
              estimate =
                DEVELOPER_GRADES.middle.efficiency * findedTask.estimate;
              break;
            case DEVELOPER_GRADES.signor.grade:
              estimate =
                DEVELOPER_GRADES.signor.efficiency * findedTask.estimate;
              break;
          }
        }
        return estimate;
      }, 0);
      return sumEmploy + employEstimate;
    }, 0);

    return {
      projectEstimation,
      projectCost,
    };
  }
}

class Util {
  static randomGeneration = (max, min) => {
    return Math.floor(Math.random() * (max - min)) + min;
  };

  static randomBoolean = () => {
    return Math.random() < 0.5;
  };

  static gradeGenetation = () => {
    const grades = ["Junior", "Middle", "Signor"];
    const randomGrade = Util.randomGeneration(3, 0);
    return grades[randomGrade];
  };

  static sideGenetation = () => {
    const sides = ["Back", "Front"];
    const randomSide = Util.randomGeneration(2, 0);
    return sides[randomSide];
  };
}

const itCompany = new ItCompany();
itCompany.hireEmployees();
const project = new Customer();
project.createProject();
const resultOfProjectImplementation = itCompany.calculateProjectImplementation(
  project.projectSettings
);

console.log(
  "resultOfProjectImplementation :>> ",
  resultOfProjectImplementation
);
