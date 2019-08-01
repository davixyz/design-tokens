//
//  Do not edit directly this is automatically generated
//
import UIKit


public enum IconImage: String, CaseIterable
{
    case delete
    case restart
    case search
    case trash

  public var image: UIImage
  {
      switch self
      {
           case .delete:
              return Image.delete
           case .restart:
              return Image.restart
           case .search:
              return Image.search
           case .trash:
              return Image.trash
      }
  }
}

public class Image
{
  public static let delete:UIImage = UIImage.image(for: "delete")
  public static let restart:UIImage = UIImage.image(for: "restart")
  public static let search:UIImage = UIImage.image(for: "search")
  public static let trash:UIImage = UIImage.image(for: "trash")
}
