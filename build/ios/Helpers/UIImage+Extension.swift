import Foundation
import UIKit

public extension UIImage
{
    private static var bundlePrivate: Bundle?

    private static var bundle: Bundle
    {
        if UIImage.bundlePrivate == nil
        {
            UIImage.bundlePrivate = Bundle(for: Image.self)
            let resourceUrl = UIImage.bundlePrivate!.resourceURL!
            if let localBundle = Bundle(url: resourceUrl.appendingPathComponent("DesignTokensBundle.bundle"))
            {
                UIImage.bundlePrivate = localBundle
            }
        }

        return UIImage.bundlePrivate!
    }

    public static func image(for name: String) -> UIImage
    {
        if let image = UIImage(named: name,
                               in: bundle,
                               compatibleWith: nil)?.withRenderingMode(.alwaysTemplate)
        {
            return image
        }
        else
        {
            assertionFailure("Failed to retrieve asset: \(name)")
            //
            // something is very busted if you ever see this on the screen
            //
            return UIColor.red.image(CGSize(width: 40, height: 40))
        }
    }
}
