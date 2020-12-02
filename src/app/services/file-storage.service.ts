import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FileStorageService {
  constructor() {}

  saveFileInStorage(input: HTMLInputElement): void {
    const file = input.files[0];
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = () => {
      localStorage.setItem('zones', reader.result as string);
    };
  }

  onFileSelect(input: HTMLInputElement): string[] {
    const file = input.files[0];
    const reader = new FileReader();
    reader.readAsText(file);

    const zonesArray: any = [];
    reader.onload = () => {
      const modifiedZones = reader.result.toString().split('\r\n');
      modifiedZones.find((zone) => {
        zonesArray.push(zone.split(','));
      });
    };

    return zonesArray;
  }

  /**
   * Return a formatted array of zones from storage
   */
  fetchAndFormatCsvFile(): string[] {
    const zones = localStorage.getItem('zones');

    const zonesArray = [];
    const modifiedZones = zones.split('\r\n');
    modifiedZones.find((zone) => {
      zonesArray.push(zone.split(','));
    });

    return zonesArray;
  }
}
