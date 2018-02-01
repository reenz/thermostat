'use strict';

describe('Thermostat', function() {

  var thermostat;

  beforeEach(function() {
    thermostat = new Thermostat();
  });

  it('starts at 20 degrees', function() {
    expect(thermostat.currentTemp()).toEqual(20);
  });

  it('increases the temp by 1', function() {
    thermostat.up();
    expect(thermostat.currentTemp()).toEqual(21);
  });

  it('decreases the temp by 1', function() {
    thermostat.down();
    expect(thermostat.currentTemp()).toEqual(19);
  });

  it('returns minimum temperature of 10', function() {
    for(var i = 0; i < 11; i++){
      thermostat.down();
    }
    expect(thermostat.currentTemp()).toEqual(10);
  });

  it('power saving mode on by default', function() {
    expect(thermostat.isPowerSavingModeOn()).toBe(true);
  });

  it('can switchoff power saving mode', function() {
    thermostat.switchPowerSavingModeOff();
    expect(thermostat.isPowerSavingModeOn()).toBe(false);
  });

  it('can switch power saving mode back on', function() {
    thermostat.switchPowerSavingModeOff();
    expect(thermostat.isPowerSavingModeOn()).toBe(false);
    thermostat.switchPowerSavingModeOn();
    expect(thermostat.isPowerSavingModeOn()).toBe(true);
  });

  it('can be reset to the default temperature', function() {
    for (var i = 0; i < 10; i++) {
      thermostat.down();
    }
    thermostat.resetTemperature();
    expect(thermostat.currentTemp()).toEqual(20);
  });

  describe ('When power saving mode is on', function(){
    it('sets max temp of 25', function() {
      for(var i = 0; i < 6; i++){
        thermostat.up();
      }
      expect(thermostat.currentTemp()).toEqual(25);
    });
  })

  describe('when power saving mode is off', function() {
    it('sets max temp of 32', function() {
      thermostat.switchPowerSavingModeOff();
      for (var i = 0; i < 13; i++) {
        thermostat.up();
      }
      expect(thermostat.currentTemp()).toEqual(32);
    });
  });

  describe ('Current energy usage',function(){
    it ('is low-usage when temperature is below 18', function(){
      for (var i = 0; i < 3;i++)
      thermostat.down();
      expect(thermostat.energyUsage()).toEqual('Low-usage');
    });

    it ('is medium-usage when temperature is between 18-25', function(){
      for (var i = 0; i < 2;i++)
      thermostat.down();
      expect(thermostat.energyUsage()).toEqual('Medium-usage');
    });

    it ('is high-usage when temperature is higher than 25', function(){
      thermostat.switchPowerSavingModeOff();
      for (var i = 0; i < 8;i++)
      thermostat.up();
      expect(thermostat.energyUsage()).toEqual('High-usage');
    });
  });
});
