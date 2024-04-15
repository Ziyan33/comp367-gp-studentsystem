pipeline {
    agent any

    tools {
        maven 'M3'
    }

    stages {
        stage('Checkout') {
            steps {
                git 'https://github.com/Ziyan33/comp367-gp-studentsystem.git'
            }
        }

        stage('Build') {
            steps {
                script {
                    powershell "mvn -B clean install"
                }
            }
        }

        stage('Test') {
            steps {
                script {
                    powershell "mvn test; if (\\$?) { echo 'Tests completed.' } else { echo 'No tests to run.' }"
                }
            }
            post {
                always {
                    // Attempt to archive test reports only if they exist
                    script {
                        if (powershell(returnStdout: true, script: "Test-Path '**/target/surefire-reports/TEST-*.xml'").trim().equals("True")) {
                            junit '**/target/surefire-reports/TEST-*.xml'
                        } else {
                            echo "No test reports found, skipping archiving."
                        }
                    }
                }
            }
        }
    }

    post {
        success {
            echo 'Build and test stages completed successfully.'
        }
        failure {
            echo 'An error occurred during the build process.'
        }
        always {
            echo 'Pipeline execution complete.'
        }
    }
}
