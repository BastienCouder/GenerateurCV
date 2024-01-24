import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "../components/ui/form";
import { Input } from "../components/ui/input";

interface SocialNetworksInfosProps {
  form: any; // Remplacez 'any' par le type approprié
}

const initialSocialNetworks = [
  { network: "LinkedIn", value: "" },
  { network: "GitHub", value: "" },
  { network: "Instagram", value: "" },
  { network: "Website", value: "" },
];

export default function SocialNetworksInfos({
  form,
}: SocialNetworksInfosProps) {
  return (
    <div className="space-y-4">
      {initialSocialNetworks.map((networkField, index) => (
        <FormField
          key={networkField.network}
          control={form.control}
          name={`socialnetworks.${networkField.network.toLowerCase()}`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{networkField.network}</FormLabel>
              <FormControl>
                <Input
                  placeholder={`Entre ton ${networkField.network}`}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      ))}
    </div>
  );
}
