var GatewayHomeView = (function () {
  var EC = protractor.ExpectedConditions;

  function GatewayHomeView() {
    var self = this;
    var wait = 5*1000;
    var sleep = 500;


    //menu item lists
    self.policyMenuItemList = element.all(by.css('[data-menutype=policy] .tree-item-row'));
    self.pipelineMenuItemList = element.all(by.css('[data-menutype=pipeline] .tree-item-row'));
    self.gatewayMapMenuItemList = element.all(by.css('[data-menutype=gatewaymap] .tree-item-row'));

    self.componentIdentifier = element(
      by.css('span.ia-project-title-container'));


    self.homeNav = element(by.css('div.branding a'));

    // policy
    self.policyListViewButton = element(by.css('button[data-type="policy"].tree-branch'));
    self.policyContainer = element(by.css('div[ng-controller="PolicyMainController"]'));

    self.editPolicyNameInput = element(by.css('input[type="text"][ng-model="policy.name"]'));
    self.newPolicyNameInput = element(by.css('div.modal-body input[type="text"][ng-model="policy.name"]'));
    self.newPolicyTypeSelect = element(by.css('div.modal-body div.policy-type-select-container button.toggle-btn'));
    self.deletePolicyButton = element(by.css('table.policies tbody tr:nth-child(1) td.actions a.delete-policy'));
    //self.newPolicyTypeValueAttrib = element(by.css('div.modal-body div.policy-type-select-container button.toggle-btn'));
    self.policyTypeAuthSelect = element(by.css('div.modal-body div.policy-type-select-container ul.dropdown-menu li button[value="auth"]'));
    self.policyTypeMetricsSelect = element(by.css('div.modal-body div.policy-type-select-container ul.dropdown-menu li button[value="metrics"]'));
    self.policyTypeRateLimitingSelect = element(by.css('div.modal-body div.policy-type-select-container ul.dropdown-menu li button[value="ratelimiting"]'));
    self.policyTypeReversProxySelect = element(by.css('div.modal-body div.policy-type-select-container ul.dropdown-menu li button[value="reverseproxy"]'));

    self.policyReversProxyTargetUrlInput = element(by.css('div.modal-body div.policy-proxy-container input[ng-model="policy.targetURL"]'));
    self.policyRateLimitingLimitInput = element(by.css('div.modal-body div.policy-ratelimit-container input[ng-model="policy.limit"]'));
    self.policyRateLimitingIntervalInput = element(by.css('div.modal-body div.policy-ratelimit-container input[ng-model="policy.interval"]'));
    self.policyAuthScopeInput = element(by.css('div.modal-body div.policy-scope-input-container input.policy-scope-input'));

    self.sideNewPolicyButton = element(by.css('button[data-type="policy"].nav-tree-item-addnew'));
    self.mainNewPolicyButton = element(by.css('div.entity-list-container button[data-type="policy"].add-new'));

    self.closeModalButton = element(by.css('button[ng-click="close()"]'));
    self.saveNewInstanceButton = element(by.css('div.modal-footer button.primary'));

    self.pipelineListViewButton = element(by.css('button[data-type="pipeline"].tree-branch'));
    self.pipelineContainer = element(by.css('div[ng-controller="PipelineMainController"]'));

    self.newPipelineNameInput = element(by.css('.modal-body div[data-id="PipelineFormContainer"] input[ng-model="pipeline.name"]'));
    self.editPipelineNameInput = element(by.css('div[data-id="PipelineFormContainer"] input[ng-model="pipeline.name"]'));
    self.newPipelineAddPolicyButton = element(by.css('.modal-body div[data-id="PipelineFormContainer"] div.ui-menu-container button.toggler'));
    self.newPipelineMetricsPolicySelect = element(by.css('.modal-body a[data-id="new Metrics policy name"]'));
    self.newPipelineFirstPolicy = element(by.css('.modal-body td[title="new Metrics policy name"]'));

    self.deletePipelineButton = element(by.css('table.pipelines td.actions a.delete-pipeline'));

    self.sideNewPipelineButton = element(by.css('button[data-type="pipeline"].nav-tree-item-addnew'));
    self.mainNewPipelineButton = element(by.css('div.entity-list-container button[data-type="pipeline"].add-new'));

    self.sideNewMappingButton = element(by.css('button[data-type="gatewaymap"].nav-tree-item-addnew'));
    self.mainNewMappingButton = element(by.css('div.entity-list-container button[data-type="gatewaymap"].add-new'));

    self.gatewaymapListViewButton = element(by.css('button[data-type="gatewaymap"].tree-branch'));

    self.mappingContainer = element(by.css('div[ng-controller="GatewayMapMainController"]'));
    self.newMappingNameInput = element(by.css('.modal-body div[data-id="GatewayMapFormContainer"] input.map-name'));
    self.newMappingEndpointInput = element(by.css('.modal-body div[data-id="GatewayMapFormContainer"] input.map-endpoint'));
    //self.editMappingNameInput = element(by.css('div[data-id="GatewayMapFormContainer"] input[ng-model="map.name"]'));
    //self.newMappingAddPipelineButton = element(by.css('.modal-body .modal-body .ui-menu-container.pipeline-menu .toggler'));
    self.newMappingVerbSelect = element(by.css('.modal-body .ui-menu-container.verb-menu .toggler'));
    self.newMappingVerbAllSelect = element(by.css('.modal-body .ui-menu-container.verb-menu .menu li:nth-child(1) a'));
    self.newMappingPipelineSelect = element(by.css('.modal-body .ui-menu-container.pipeline-menu .toggler'));
    self.newMappingPipelineInstanceSelect = element(by.css('.modal-body .ui-menu-container.pipeline-menu .menu li:nth-child(1) a'));
    //self.newMappingFirstPipeline = element(by.css('.modal-body td[title="new pipeline"]'));
    //
    self.deleteMappingButton = element(by.css('table.mappings td.actions a.delete-map'));
    self.confirmDeleteMappingButton = element(by.css('.modal button.delete-map'));
    self.confirmDeletePipelineButton = element(by.css('.modal button.delete-pipeline'));
    self.confirmDeletePolicyButton = element(by.css('.modal button.delete-policy'));

    //shared clone
    self.confirmCloneButton = element(by.css('.clone-modal button.primary'));
    self.confirmDeleteCloneButton = element(by.css('.confirm-delete button.primary'));

    //clone policy
    self.contextMenuPolicy = element(by.css('[data-menutype="policy"] .tree-item-row:nth-child(1) .btn-nav-context'));
    self.clonePolicyButton = element(by.css('[data-menutype="policy"] .tree-item-row:nth-child(1) .clone-instance'));
    self.clonedContextMenuPolicy = element(by.css('[data-menutype="policy"] .tree-item-row:nth-child(2) .btn-nav-context'));
    self.deleteClonedPolicyButton = element(by.css('[data-menutype="policy"] .tree-item-row:nth-child(2) .delete-instance'));

    //clone pipeline
    self.contextMenuPipeline = element(by.css('[data-menutype="pipeline"] .tree-item-row:nth-child(1) .btn-nav-context'));
    self.clonePipelineButton = element(by.css('[data-menutype="pipeline"] .tree-item-row:nth-child(1) .clone-instance'));
    self.clonedContextMenuPipeline = element(by.css('[data-menutype="pipeline"] .tree-item-row:nth-child(2) .btn-nav-context'));
    self.deleteClonedPipelineButton = element(by.css('[data-menutype="pipeline"] .tree-item-row:nth-child(2) .delete-instance'));

    //clone mapping
    self.contextMenuMapping = element(by.css('[data-menutype="gatewaymap"] .tree-item-row:nth-child(1) .btn-nav-context'));
    self.cloneMappingButton = element(by.css('[data-menutype="gatewaymap"] .tree-item-row:nth-child(1) .clone-instance'));
    self.clonedContextMenuMapping = element(by.css('[data-menutype="gatewaymap"] .tree-item-row:nth-child(2) .btn-nav-context'));
    self.deleteClonedMappingButton = element(by.css('[data-menutype="gatewaymap"] .tree-item-row:nth-child(2) .delete-instance'));

    //page object methods
    self.openNewPolicyFromNav = function() {
      self.sideNewPolicyButton.click();
      browser.driver.sleep(sleep);
      expect(EC.visibilityOf(self.closeModalButton));
      self.closeModalButton.click();
    };
    self.openNewPolicyFromView = function() {
      expect(EC.visibilityOf(self.mainNewPolicyButton));
      self.mainNewPolicyButton.click();
      browser.driver.sleep(sleep);
      expect(EC.visibilityOf(self.closeModalButton));
      self.closeModalButton.click();
    };

    self.addMetricsPolicy = function() {
      self.sideNewPolicyButton.click();
      browser.waitForAngular();
      browser.driver.wait(EC.presenceOf(self.newPolicyNameInput), wait);

      self.newPolicyNameInput.sendKeys('new Metrics policy name');

      self.newPolicyTypeSelect.click();
      browser.waitForAngular();

      browser.driver.wait(EC.presenceOf(self.policyTypeMetricsSelect), wait);

      self.policyTypeMetricsSelect.click();
      browser.waitForAngular();
      expect(self.newPolicyTypeSelect.getText()).toEqual('metrics');

      browser.driver.wait(EC.presenceOf(self.saveNewInstanceButton), wait);

      self.saveNewInstanceButton.click();
      browser.waitForAngular();
    };

    self.addAuthPolicy = function() {
      self.sideNewPolicyButton.click();

      browser.waitForAngular();
      browser.driver.wait(EC.presenceOf(self.newPolicyNameInput), wait);

      self.newPolicyNameInput.sendKeys('new Auth policy name');
      self.newPolicyTypeSelect.click();
      browser.waitForAngular();

      self.policyTypeAuthSelect.click();
      browser.waitForAngular();

      expect(self.newPolicyTypeSelect.getText()).toEqual('auth');

      browser.driver.wait(EC.presenceOf(self.saveNewInstanceButton), wait);

      self.saveNewInstanceButton.click();
      browser.waitForAngular();
    };

    self.addRateLimitingPolicy = function() {
      self.sideNewPolicyButton.click();
      browser.waitForAngular();

      browser.driver.wait(EC.presenceOf(self.newPolicyNameInput), wait);

      self.newPolicyNameInput.sendKeys('new Rate Limiting policy name');

      self.newPolicyTypeSelect.click();
      browser.waitForAngular();

      self.policyTypeRateLimitingSelect.click();
      browser.waitForAngular();


      expect(self.newPolicyTypeSelect.getText()).toEqual('ratelimiting');
      expect(EC.visibilityOf(self.policyRateLimitingLimitInput));
      expect(EC.visibilityOf(self.policyRateLimitingIntervalInput));

      self.policyRateLimitingLimitInput.sendKeys('5000');
      self.policyRateLimitingIntervalInput.sendKeys('500000');

      browser.driver.wait(EC.presenceOf(self.saveNewInstanceButton), wait);

      self.saveNewInstanceButton.click();
      browser.waitForAngular();
    };

    self.addReverseProxyPolicy = function() {
      self.sideNewPolicyButton.click();
      browser.waitForAngular();

      browser.driver.wait(EC.presenceOf(self.newPolicyNameInput), wait);

      self.newPolicyNameInput.sendKeys('new Reverse Proxy policy name');

      self.newPolicyTypeSelect.click();
      browser.waitForAngular();

      self.policyTypeReversProxySelect.click();
      browser.waitForAngular();

      expect(self.newPolicyTypeSelect.getText()).toEqual('reverseproxy');
      expect(EC.visibilityOf(self.policyReversProxyTargetUrlInput));

      self.policyReversProxyTargetUrlInput.sendKeys('https://www.url.com');

      browser.driver.wait(EC.presenceOf(self.saveNewInstanceButton), wait);

      self.saveNewInstanceButton.click();
      browser.waitForAngular();
    };

    self.deleteFirstPolicy = function() {
      var isListClickable = EC.elementToBeClickable(self.policyListViewButton);

      browser.driver.wait(isListClickable, wait);
      self.policyListViewButton.click();
      browser.waitForAngular();

      //hover to reveal delete icon
      browser.actions().mouseMove(element(by.css('table.policies tbody tr:nth-child(1)'))).perform();
      //browser.driver.sleep(500);
      browser.driver.wait(EC.elementToBeClickable(self.deletePolicyButton), wait);

      //delete from list
      self.deletePolicyButton.click();
      browser.waitForAngular();

      //confirm delete
      browser.driver.wait(EC.elementToBeClickable(self.confirmDeletePolicyButton), wait);
      self.confirmDeletePolicyButton.click();
      browser.driver.wait(EC.elementToBeClickable(self.policyListViewButton), wait);
    };

    self.deleteFirstPipeline = function() {
      var isListClickable = EC.elementToBeClickable(self.pipelineListViewButton);

      browser.driver.wait(isListClickable, wait);
      self.pipelineListViewButton.click();
      browser.waitForAngular();

      //hover to reveal delete icon
      browser.actions().mouseMove(element(by.css('table.pipelines tbody tr:nth-child(1)'))).perform();
      browser.driver.wait(EC.elementToBeClickable(self.deletePipelineButton), wait);

      //delete from list
      self.deletePipelineButton.click();
      browser.waitForAngular();

      //confirm delete
      browser.driver.wait(EC.elementToBeClickable(self.confirmDeletePipelineButton), wait);
      self.confirmDeletePipelineButton.click();
      browser.waitForAngular();
      browser.driver.wait(EC.elementToBeClickable(self.pipelineListViewButton), wait);
    };

    self.deleteFirstMapping = function() {
      //load list view
      var isListClickable = EC.elementToBeClickable(self.gatewaymapListViewButton);

      browser.driver.wait(isListClickable, wait);
      self.gatewaymapListViewButton.click();
      browser.waitForAngular();

      //wait for table to load
      browser.driver.wait(EC.visibilityOf(element(by.css('table.mappings tbody tr'))), wait);

      //hover to reveal delete icon
      browser.actions().mouseMove(element(by.css('table.mappings tbody tr:nth-child(1)'))).perform();
      browser.driver.wait(EC.elementToBeClickable(self.deleteMappingButton), wait);

      self.deleteMappingButton.click();
      browser.waitForAngular();

      //confirm delete
      browser.driver.wait(EC.elementToBeClickable(self.confirmDeleteMappingButton), wait);
      self.confirmDeleteMappingButton.click();
      browser.waitForAngular();
    };

    self.cloneFirstPolicy = function(){
      //load list first
      var isListClickable = EC.elementToBeClickable(self.policyListViewButton);
      browser.driver.wait(isListClickable, wait);
      self.policyListViewButton.click();
      browser.waitForAngular();

      var isContextMenuClickable = EC.elementToBeClickable(self.contextMenuPolicy);
      browser.driver.wait(isContextMenuClickable, wait);
      self.contextMenuPolicy.click();
      browser.waitForAngular();

      var isCloneButtonClickable = EC.elementToBeClickable(self.clonePolicyButton);
      browser.driver.wait(isCloneButtonClickable, wait);
      self.clonePolicyButton.click();
      browser.waitForAngular();

      var isConfirmButtonClickable = EC.elementToBeClickable(self.confirmCloneButton);
      browser.driver.wait(isConfirmButtonClickable, wait);
      self.confirmCloneButton.click();
      browser.waitForAngular();
    };

    self.deleteFirstPolicyClone = function(){
      //load list
      var isListClickable = EC.elementToBeClickable(self.policyListViewButton);
      browser.driver.wait(isListClickable, wait);
      self.policyListViewButton.click();
      browser.waitForAngular();

      var isContextMenuClickable = EC.elementToBeClickable(self.clonedContextMenuPolicy);
      browser.driver.wait(isContextMenuClickable, wait);
      self.clonedContextMenuPolicy.click();
      browser.waitForAngular();

      var isDeleteButtonClickable = EC.elementToBeClickable(self.deleteClonedPolicyButton);
      browser.driver.wait(isDeleteButtonClickable, wait);
      self.deleteClonedPolicyButton.click();
      browser.waitForAngular();

      var isConfirmButtonClickable = EC.elementToBeClickable(self.confirmDeleteCloneButton);

      browser.driver.wait(isConfirmButtonClickable, wait);
      self.confirmDeleteCloneButton.click();
      browser.waitForAngular();
    };

    self.cloneFirstPipeline = function(){
      var isListClickable = EC.elementToBeClickable(self.pipelineListViewButton);
      browser.driver.wait(isListClickable, wait);
      self.pipelineListViewButton.click();
      browser.waitForAngular();

      var isContextMenuClickable = EC.elementToBeClickable(self.contextMenuPipeline);
      browser.driver.wait(isContextMenuClickable, wait);
      self.contextMenuPipeline.click();
      browser.waitForAngular();

      var isCloneButtonClickable = EC.elementToBeClickable(self.clonePipelineButton);
      browser.driver.wait(isCloneButtonClickable, wait);
      self.clonePipelineButton.click();
      browser.waitForAngular();

      var isConfirmButtonClickable = EC.elementToBeClickable(self.confirmCloneButton);
      browser.driver.wait(isConfirmButtonClickable, wait);
      self.confirmCloneButton.click();
      browser.waitForAngular();
    };

    self.deleteFirstPipelineClone = function(){
      var isListClickable = EC.elementToBeClickable(self.pipelineListViewButton);
      browser.driver.wait(isListClickable, wait);
      self.pipelineListViewButton.click();
      browser.waitForAngular();

      var isContextMenuClickable = EC.elementToBeClickable(self.clonedContextMenuPipeline);
      browser.driver.wait(isContextMenuClickable, wait);
      self.clonedContextMenuPipeline.click();
      browser.waitForAngular();

      var isDeleteButtonClickable = EC.elementToBeClickable(self.deleteClonedPipelineButton);
      browser.driver.wait(isDeleteButtonClickable, wait);
      self.deleteClonedPipelineButton.click();
      browser.waitForAngular();

      var isConfirmButtonClickable = EC.elementToBeClickable(self.confirmDeleteCloneButton);

      browser.driver.wait(isConfirmButtonClickable, wait);
      self.confirmDeleteCloneButton.click();
      browser.waitForAngular();
    };

    self.cloneFirstMapping = function(){
      var isListClickable = EC.elementToBeClickable(self.gatewaymapListViewButton);
      browser.driver.wait(isListClickable, wait);
      self.gatewaymapListViewButton.click();
      browser.waitForAngular();

      var isContextMenuClickable = EC.elementToBeClickable(self.contextMenuMapping);
      browser.driver.wait(isContextMenuClickable, wait);
      self.contextMenuMapping.click();
      browser.waitForAngular();

      var isCloneButtonClickable = EC.elementToBeClickable(self.cloneMappingButton);
      browser.driver.wait(isCloneButtonClickable, wait);
      self.cloneMappingButton.click();
      browser.waitForAngular();

      var isConfirmButtonClickable = EC.elementToBeClickable(self.confirmCloneButton);
      browser.driver.wait(isConfirmButtonClickable, wait);
      self.confirmCloneButton.click();
      browser.waitForAngular();
    };

    self.deleteFirstMappingClone = function(){
      var isListClickable = EC.elementToBeClickable(self.gatewaymapListViewButton);
      browser.driver.wait(isListClickable, wait);
      self.gatewaymapListViewButton.click();
      browser.waitForAngular();

      var isContextMenuClickable = EC.elementToBeClickable(self.clonedContextMenuMapping);
      browser.driver.wait(isContextMenuClickable, wait);
      self.clonedContextMenuMapping.click();
      browser.waitForAngular();

      var isDeleteButtonClickable = EC.elementToBeClickable(self.deleteClonedMappingButton);
      browser.driver.wait(isDeleteButtonClickable, wait);
      self.deleteClonedMappingButton.click();
      browser.waitForAngular();

      var isConfirmButtonClickable = EC.elementToBeClickable(self.confirmDeleteCloneButton);

      browser.driver.wait(isConfirmButtonClickable, wait);
      self.confirmDeleteCloneButton.click();
      browser.waitForAngular();
    };

    self.addNewPipeline = function() {
      // get input field
      browser.driver.wait(EC.presenceOf(self.newPipelineNameInput), wait);
      browser.driver.wait(EC.presenceOf(self.newPipelineAddPolicyButton), wait);

      // send keys 'new pipeline'
      self.newPipelineNameInput.sendKeys('new pipeline');
      browser.driver.sleep(sleep);
     // expect(EC.visibilityOf(self.newPipelineAddPolicyButton));

       // add policy
      self.newPipelineAddPolicyButton.click();
      browser.waitForAngular();

      browser.driver.wait(EC.presenceOf(self.newPipelineMetricsPolicySelect), wait);
     // expect(EC.visibilityOf(self.newPipelineMetricsPolicySelect));
      self.newPipelineMetricsPolicySelect.click();
      browser.waitForAngular();

      // verify policy added
     // expect(EC.visibilityOf(self.newPipelineFirstPolicy));
      browser.driver.wait(EC.presenceOf(self.newPipelineFirstPolicy), wait);

      // save pipeline
    //
    //self.newPipelineNameInput
    //self.newPipelineAddPolicyButton
    //self.newPipelineMetricsPolicySelect
    //self.newPipelineFirstPolicy
      //browser.sleep(7000);
      browser.driver.wait(EC.presenceOf(self.saveNewInstanceButton), wait);

      self.saveNewInstanceButton.click();
      browser.waitForAngular();
    };

    self.addNewMapping = function() {
      // get input field
      //expect(EC.visibilityOf(self.newMappingNameInput));
    //  expect(EC.visibilityOf(self.newMappingAddPipelineButton));
      browser.driver.wait(
        EC.presenceOf(self.newMappingNameInput),
        4000);
      //browser.driver.wait(
      //  EC.presenceOf(self.newMappingAddPipelineButton),
      //  4000);
      // send keys 'new mapping'

      self.newMappingNameInput.sendKeys('new mapping');
     //
     //
     //// browser.pause();
     // // add verb
      self.newMappingVerbSelect.click();
      browser.waitForAngular();
      browser.sleep(300);
      browser.driver.wait(
        EC.presenceOf(self.newMappingVerbAllSelect),
        4000);
      self.newMappingVerbAllSelect.click();

      browser.sleep(100);
      expect(EC.visibilityOf(self.newMappingVerbSelect));

      self.newMappingEndpointInput.sendKeys('http://www.url.com');


      self.newMappingPipelineSelect.click();
      browser.waitForAngular();
      browser.driver.wait(
        EC.presenceOf(self.newMappingPipelineInstanceSelect),
        4000);
      self.newMappingPipelineInstanceSelect.click();
      browser.waitForAngular();
      browser.sleep(100);


      // expect(EC.visibilityOf(self.newMappingInstanceSelect));
     // self.newMappingInstanceSelect.click();
     // browser.sleep(300);
     //
     //
     // // add endpoint
     // // choose pipeline
     // // save
     //
     //
     // // add pipeline
     // self.newMappingAddPipelineButton.click();
     // browser.sleep(300);
     //
     // // verify policy added
     // expect(EC.visibilityOf(self.newMappingFirstPipeline));
     // // save pipeline
     // //
     // browser.sleep(300);
     //
      self.saveNewInstanceButton.click();
      browser.waitForAngular();
    };



    //GatewayMapMainController
    self.waitUntilLoaded = function() {
      browser.driver.wait(EC.presenceOf(self.componentIdentifier), wait);
    };
  }
  return GatewayHomeView;
})();

module.exports = GatewayHomeView;
