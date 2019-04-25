pipeline {
    agent any
    tools {
        nodejs 'node 11.12'
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