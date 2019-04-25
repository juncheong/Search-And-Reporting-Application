pipeline {
    agent any
    tools {
        nodejs 'node 11.12'
    }
    parameters {
        string(name: 'DOCKER_COMPOSE_FILENAME', defaultValue: 'docker-compose.yml', description: '')
    }

    stages {
        stage('npm install') {
            steps {
                sh "npm install"
            }
        }
        post {
            always {
                sh 'echo "Writing from Jenkinsfile"'
            }
        }
    }
}