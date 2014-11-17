define(['app'], function (app) {
    app.factory('loadingAnimationService', function() {
        function LoadingAnimationService(){
            self = this;

            self.rootLockActive = true;
            self.rootLockCount = 1;
            self.rootLoadingAnimationActive = true;
            self.viewLoadingAnimationActive = false;

            self.setRootLoading = function(value){
                if(value == true){
                    self.rootLockCount++;
                    self.rootLoadingAnimationActive = value;
                    self.rootLockActive = value;
                }
                else{
                    self.rootLockCount--;
                    if(self.rootLockCount == 0){
                        self.viewLoadingAnimationActive = value;
                        self.rootLoadingAnimationActive = value;
                        self.rootLockActive = value;
                    }
                }
            }

            self.setViewLoading = function(value){
                if(value == true){
                    self.rootLockCount++;
                    self.viewLoadingAnimationActive = value;
                    self.rootLockActive = value;
                }
                else{
                    self.rootLockCount--;
                    if(self.rootLockCount == 0){
                        self.viewLoadingAnimationActive = value;
                        self.rootLoadingAnimationActive = value;
                        self.rootLockActive = value;
                    }
                }
            }
        }
        return new LoadingAnimationService();
    });
});
