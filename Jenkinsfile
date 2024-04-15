pipeline {
    agent any

    parameters {
        booleanParam(name: 'RUN_TESTS', defaultValue: false, description: 'Set to true to run tests during the build process')
    }

    tools {
        // Ensure Node.js is configured under Jenkins' Global Tool Configuration with the name 'NodeJS'
        nodejs 'NodeJS'
    }

    environment {
        // Environment variables can be set here if needed
        CI = 'true' // Set CI environment variable to true for better integration with tools like Create React App
    }

    stages {
        stage('Prepare Environment') {
            steps {
                script {
                    // Ensuring Git is configured to handle long paths on Windows
                    bat 'git config --system core.longPaths true'
                }
            }
        }

        stage('Checkout SCM') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                script {
                    // Installing npm dependencies
                    bat 'npm install'
                }
            }
        }

        stage('Build') {
            steps {
                script {
                    // Building the project with npm
                    bat 'npm run build'
                }
            }
        }

        stage('Test') {
            when {
                expression { params.RUN_TESTS } // Only run tests if the RUN_TESTS parameter is set to true
            }
            steps {
                script {
                    // Running npm tests
                    bat 'npm test'
                }
                post {
                    always {
                        // Collecting and archiving test reports can be configured here
                        // Example: Archive the results for later viewing in Jenkins
                        archiveArtifacts artifacts: 'path/to/test-reports/*', fingerprint: true
                    }
                }
            }
        }

        stage('Deploy') {
            steps {
                echo 'Deploy operation would go here. This could be a script to deploy to a server or another environment.'
                // Example deployment command
                // bat 'deploy-script.bat'
            }
        }
    }

    post {
        always {
            // Cleaning up the workspace after the build to free up space
            cleanWs()
            echo 'Build process completed.'
        }
        success {
            echo 'Build completed successfully.'
        }
        failure {
            echo 'Build failed. Check logs for details.'
        }
    }
}
