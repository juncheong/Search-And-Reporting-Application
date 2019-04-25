pipeline {
    agent {
        docker {
            image 'node:11-alpine'
            args '-p 3000:3000'
        }
    }
    stages {
        stage('npm install') {
            steps {
                sh "npm install"
            }
        }
    }
}