pipeline {
    agent {
        docker {
            image 'node:11.12'
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
    post {
        always {
            sh 'echo "Writing from Jenkinsfile"'
        }
    }
}