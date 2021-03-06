import { Meteor } from 'meteor/meteor';
import { Tests } from '../imports/api/Tests.js';

Meteor.startup(() => {
  var Api = new Restivus({
    version: 'v1',
    useDefaultAuth: true,
    prettyJson: true
  });

  Api.addCollection(Tests);
  Api.addCollection(Meteor.users);

  if (Meteor.users.find().count() === 0) {
    var options = {
      username: 'admin',
      password: '1234',
      email: 'amanbayev@gmail.com',
      profile: {
        firstName: 'Admin',
        lastName: 'Super',
        company: 'KazInfoTech'
      }
    };
    var cUser = Accounts.createUser(options);
    Roles.addUsersToRoles(cUser, 'admin');
  }

  Meteor.publish("allUsers", function(){
    return Meteor.users.find();
  });

  Meteor.methods({
    checkUsername:function(username){
       var cFound = Accounts.findUserByUsername(username);
       if (cFound){
         return cFound;
       } else {
         return false;
       }
    },
    createUser2:function(uname, pw, profile) {
      var options = {
        username: uname,
        password: pw,
        profile: profile
      }
      var cUser = Accounts.createUser(options);
      Roles.addUsersToRoles(cUser, 'student');
      return cUser;
    }
  });
  if (Tests.find().count() === 0) {
    var newTest = {
      "_id": "N73buHdy6Axt2vprH",
      "name": "Android программирование",
      "questions": [
        {
          "id": 1,
          "question": "Какой язык используют для нативного написания android приложений?",
          "answers": [
            "Java",
            "Swift",
            "objective-C"
          ],
          "correct": "Java"
        },
        {
          "id": 2,
          "question": "Какая официальная IDE для разработки Android?",
          "answers": [
            "Eclipse",
            "Xcode",
            "Android Studio"
          ],
          "correct": "Android Studio"
        },
        {
          "id": 3,
          "question": "Нужны ли дополнительные SDK для разработки на Андроид, кроме JDK?",
          "answers": [
            "Да, Android SDK",
            "Нет",
            "Не всегда"
          ],
          "correct": "Да, Android SDK"
        },
        {
          "id": 4,
          "question": "Что произойдет, если сменится ориентация экрана устройства во врема работы приложения?",
          "answers": [
            "Ничего",
            "Перезапустится текущий Activity",
            "Выскочит ошибка"
          ],
          "correct": "Перезапустится текущий Activity"
        },
        {
          "id": 5,
          "question": "Сколько стоит учетная запись разработчика Android для Play Market",
          "answers": [
            "25$ в год",
            "25$ на всю жизнь",
            "99$ в год"
          ],
          "correct": "25$ на всю жизнь"
        },
        {
          "id": 6,
          "question": "Если Назарбаев скачает ваше приложение, то ...",
          "answers": [
            "... вы попадете в Топ-10",
            "... ваш аккаунт заблокируют в Казахстане",
            "оба варианта возможны =)"
          ],
          "correct": "оба варианта возможны =)"
        }
      ]
    };
    Tests.insert(newTest);
    var newTest = {
      "_id": "N73buHdy6Axt2vprH",
      "name": "Математика",
      "questions": [
        {
          "id": 1,
          "question": "Сколько будет 2+2?",
          "answers": [
            "4",
            "5",
            "6"
          ],
          "correct": "4"
        },
        {
          "id": 2,
          "question": "Сколько будет 18 - 13",
          "answers": [
            "5",
            "2",
            "11"
          ],
          "correct": "5"
        },
        {
          "id": 3,
          "question": "Теорема пифагора гласит:",
          "answers": [
            "Квадрат гипотенузы равен произведению катетов!",
            "На любую силу есть большая сила!",
            "Квадрат гипотенузы равен сумме квадратов катетов!"
          ],
          "correct": "Квадрат гипотенузы равен сумме квадратов катетов!"
        }
      ]
    };
    Tests.insert(newTest);
    var newTest = {
      "_id": "N73buHdy6Axt2vprH",
      "name": "Познание мира",
      "questions": [
        {
          "id": 1,
          "question": "Откуда появилось название фрукта апельсин?",
          "answers": [
            "Китайское яблоко (апель и син)",
            "Перевод с английского",
            "Смысла нет!"
          ],
          "correct": "Китайское яблоко (апель и син)"
        },
        {
          "id": 2,
          "question": "Какая официальная IDE для разработки Android?",
          "answers": [
            "Eclipse",
            "Xcode",
            "Android Studio"
          ],
          "correct": "Android Studio"
        },
        {
          "id": 3,
          "question": "Нужны ли дополнительные SDK для разработки на Андроид, кроме JDK?",
          "answers": [
            "Да, Android SDK",
            "Нет",
            "Не всегда"
          ],
          "correct": "Да, Android SDK"
        },
        {
          "id": 4,
          "question": "Что произойдет, если сменится ориентация экрана устройства во врема работы приложения?",
          "answers": [
            "Ничего",
            "Перезапустится текущий Activity",
            "Выскочит ошибка"
          ],
          "correct": "Перезапустится текущий Activity"
        },
        {
          "id": 5,
          "question": "Сколько стоит учетная запись разработчика Android для Play Market",
          "answers": [
            "25$ в год",
            "25$ на всю жизнь",
            "99$ в год"
          ],
          "correct": "25$ на всю жизнь"
        },
        {
          "id": 6,
          "question": "Если Назарбаев скачает ваше приложение, то ...",
          "answers": [
            "... вы попадете в Топ-10",
            "... ваш аккаунт заблокируют в Казахстане",
            "оба варианта возможны =)"
          ],
          "correct": "оба варианта возможны =)"
        },
        {
          "id": 7,
          "question": "Сколько будет 2+2?",
          "answers": [
            "4",
            "5",
            "6"
          ],
          "correct": "4"
        },
        {
          "id": 8,
          "question": "Сколько будет 18 - 13",
          "answers": [
            "5",
            "2",
            "11"
          ],
          "correct": "5"
        },
        {
          "id": 9,
          "question": "Теорема пифагора гласит:",
          "answers": [
            "Квадрат гипотенузы равен произведению катетов!",
            "На любую силу есть большая сила!",
            "Квадрат гипотенузы равен сумме квадратов катетов!"
          ],
          "correct": "Квадрат гипотенузы равен сумме квадратов катетов!"
        }
      ]
    };
    Tests.insert(newTest);
  }
});
