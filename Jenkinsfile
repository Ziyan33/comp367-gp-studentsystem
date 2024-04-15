pipeline {
    agent any

    tools {
        maven 'M3'
    }



    stages {
        stage('Prepare Environment') {
            steps {
                script {
                    // Configuring Git to support long file paths on Windows
                    bat "git config --system core.longPaths true"
                }
            }
        }

        stage('Checkout SCM') {
            steps {
                checkout scm
            }
        }

        stage('Build') {
            steps {
                script {
                    // Running Maven build
                    bat "mvn clean install"
                }
            }
        }

        stage('Test') {
            steps {
                script {
                    // Running tests with Maven
                    bat "mvn test"
                }
                post {
                    always {
                        // Archiving test results, if they exist
                        junit '**/target/surefire-reports/TEST-*.xml'
                    }
                }
            }
        }

        stage('Deploy') {
            steps {
                script {
                    // Deployment script or additional steps could be added here
                    echo 'Deploying build'
                }
            }
        }
    }

    post {
        always {
            echo 'Cleaning up workspace'
            cleanWs() // Cleans the workspace after the pipeline run is complete
        }
        success {
            echo 'Build and test stages completed successfully.'
        }
        failure {
            echo 'An error occurred during the build process.'
        }
    }
}
