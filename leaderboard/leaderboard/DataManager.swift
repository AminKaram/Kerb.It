//
//  DataManager.swift
//  leaderboard
//
//  Created by Saurav Mitra on 03/06/2016.
//  Copyright © 2016 APTSD. All rights reserved.
//

class DataManager: NSObject, NSFetchedResultsControllerDelegate {
  var managedObjectContext: NSManagedObjectContext!
  var subscriptionLoader: SubscriptionLoader!
  
  func getNewObjectFromEntity(withName entityName: String) -> NSManagedObject {
    return NSEntityDescription.insertNewObjectForEntityForName(entityName, inManagedObjectContext: managedObjectContext)
  }
  
  func update() {
    do {
      try managedObjectContext.save()
    } catch _ {}
  }
  
  func remove(entityObject object: NSManagedObject) {
    managedObjectContext.deleteObject(object)
    update()
  }
  
  func find(entityName: String, withDescriptors descriptors: [NSSortDescriptor]) -> [NSManagedObject] {
    let fetchRequest = NSFetchRequest(entityName: entityName)
    fetchRequest.sortDescriptors = descriptors
    let fetchedResultsController = NSFetchedResultsController(fetchRequest: fetchRequest, managedObjectContext: managedObjectContext, sectionNameKeyPath: nil, cacheName: nil)
    do {
      try fetchedResultsController.performFetch()
    } catch _ {}
    fetchedResultsController.delegate = self
    return fetchedResultsController.fetchedObjects as! [NSManagedObject] //WARNING: Result does not update
  }
  
  @objc internal func controllerWillChangeContent(controller: NSFetchedResultsController) {
    //changes = [ChangeDetail]()
  }
  
  @objc internal func controller(controller: NSFetchedResultsController, didChangeSection sectionInfo: NSFetchedResultsSectionInfo, atIndex sectionIndex: Int, forChangeType type: NSFetchedResultsChangeType) {
//    switch(type) {
//    case .Insert:
//      changes!.append(.SectionInserted(sectionIndex))
//    case .Delete:
//      changes!.append(.SectionDeleted(sectionIndex))
//    default:
//      break
//    }
  }
  
  @objc internal func controller(controller: NSFetchedResultsController, didChangeObject object: AnyObject, atIndexPath indexPath: NSIndexPath?, forChangeType type: NSFetchedResultsChangeType, newIndexPath: NSIndexPath?) {
//    switch(type) {
//    case .Insert:
//      changes!.append(.ObjectInserted(newIndexPath!))
//    case .Delete:
//      changes!.append(.ObjectDeleted(indexPath!))
//    case .Update:
//      changes!.append(.ObjectUpdated(indexPath!))
//    case .Move:
//      changes!.append(.ObjectMoved(indexPath: indexPath!, newIndexPath: newIndexPath!))
//    }
  }
  
  @objc internal func controllerDidChangeContent(controller: NSFetchedResultsController) {
//    didChangeContent(changes!)
//    changes = nil
  }
}