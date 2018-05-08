pipeline {
  agent any
  tools{
    maven 'MAVEN_HOME'
  }
  options {
    buildDiscarder(logRotator(numToKeepStr:'3'))
    disableConcurrentBuilds()
  }
  stages {
    stage('Build') {
      steps {
        sh 'mvn clean package -Pprod dockerfile:build'
      }
    }
    stage('Push') {
      steps {
        script {
          if (env.BRANCH_NAME == 'master' || env.BRANCH_NAME == 'develop') {
            //input(message: 'Voulez-vous creer une nouvelle image Docker et relancer le serveur ?', ok: 'Oui')
            sh 'docker push dwaby/devops'
            slackSend (color: "#B50072", message: "Le serveur va être redémarré. \n Durée de la compilation: ${currentBuild.durationString.replace(' and counting', '')}")
          } else {
            echo "La branche actuelle ne permet pas de mettre à jour l'image Docker."
          }
        }
      }
    }
    stage('Test_Ping') {
      parallel {
        stage('Ping Server') {
          steps {
            script {
              if (env.BRANCH_NAME == 'master' || env.BRANCH_NAME == 'develop') {
                sleep 120
                slackSend (color: "#017500", message: "Bonne nouvelle ! Le serveur est up -> http://localhost:8080 \n Durée totale du déploiement: ${currentBuild.durationString.replace(' and counting', '')}")
              }
            }
          }
        }
      }
    }
  }
}
