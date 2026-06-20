pipeline {
agent any

stages {
    stage('Clone') {
        steps {
            echo 'Repository cloned'
        }
    }

    stage('Build Docker Image') {
        steps {
            dir('backend') {
                sh 'docker build -t task-manager-backend .'
            }
        }
    }
}


}
